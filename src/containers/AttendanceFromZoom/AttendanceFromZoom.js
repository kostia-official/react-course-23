import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import stringSimilarity from 'string-similarity';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import * as api from '../../api';
import { withError } from '../../HOCs/withError';
import { FadeTransitionSwitch } from '../../transitions/FadeTransitionSwitch/FadeTransitionSwitch';
import { CenterText } from '../../components/CenterText/CenterText';
import { withLoader } from '../../HOCs/withLoader';
import Button from '@material-ui/core/Button';

const Container = styled.div`
  width: 300px;
  min-height: 130px;
`;

const CardContentStyled = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardActionsStyled = styled(CardActions)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const AttendanceFromZoomComponent = ({
  students,
  setPresentStatus,
  setErrorMessage,
  setIsLoading
}) => {
  const [webinarJoins, setWebinarJoins] = useState([]);
  const [joinIndex, setJoinIndex] = useState(0);

  const setPresentStatusByJoins = useCallback(
    (joinsWithStudentId) => {
      _.forEach(joinsWithStudentId, ({ studentId }) => {
        setPresentStatus(studentId);
      });
    },
    [setPresentStatus]
  );

  const setStudentIdForJoin = useCallback(
    (participantId, studentId) =>
      setWebinarJoins((prevWebinarJoins) =>
        _.map(prevWebinarJoins, (join) => {
          if (join.participantId === participantId) {
            return { ...join, studentId };
          }

          return join;
        })
      ),
    [setWebinarJoins]
  );

  const getNotMatchedStudents = useCallback(() => {
    const studentsWithParticipantId = _.map(students, (student) => {
      const participantId = _.find(webinarJoins, { studentId: student.id });

      return { ...student, participantId };
    });

    return _.orderBy(
      studentsWithParticipantId,
      [
        'participantId',
        (student) => {
          const participantName = webinarJoins[joinIndex]?.participantName || '';
          return stringSimilarity.compareTwoStrings(participantName, student.name);
        }
      ],
      ['desc', 'desc']
    );
  }, [webinarJoins, joinIndex, students]);

  const nextJoin = () => setJoinIndex((prevJoinIndex) => prevJoinIndex + 1);

  const matchStudentAndParticipant = async (studentId, participantId) => {
    setPresentStatus(studentId);

    await api.setStudentIdForParticipant(participantId, studentId);

    nextJoin();

    setStudentIdForJoin(participantId, studentId);
  };

  useEffect(() => {
    (async () => {
      try {
        const joins = await api.getWebinarJoins();

        setPresentStatusByJoins(_.filter(joins, ({ studentId }) => studentId));
        setWebinarJoins(_.filter(joins, ({ studentId }) => !studentId));
      } catch (err) {
        setErrorMessage(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setIsLoading, setErrorMessage, setPresentStatusByJoins]);

  const webinarJoin = webinarJoins[joinIndex];
  const label = webinarJoin ? webinarJoin.participantName : 'Все студенты отмечены';
  const studentsOptions = getNotMatchedStudents();

  return (
    <FadeTransitionSwitch transitionKey={joinIndex}>
      <Container>
        <CardContentStyled>
          <CenterText>
            <Typography variant="h5">{label}</Typography>
          </CenterText>
        </CardContentStyled>

        {webinarJoin && (
          <CardActionsStyled>
            {_.map(studentsOptions, (student) => (
              <Button
                key={student.id}
                size="small"
                style={student.participantId && { color: 'grey' }}
                onClick={() => matchStudentAndParticipant(student.id, webinarJoin.participantId)}
              >
                {student.name}
              </Button>
            ))}
            <Button size="small" onClick={() => nextJoin()}>
              Пропустить
            </Button>
          </CardActionsStyled>
        )}
      </Container>
    </FadeTransitionSwitch>
  );
};

export const AttendanceFromZoom = withLoader(withError(AttendanceFromZoomComponent), {
  LoaderContainer: Container
});
