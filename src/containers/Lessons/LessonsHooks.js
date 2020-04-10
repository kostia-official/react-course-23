import React, { useState, useEffect } from 'react';
import { getLessons } from '../../api';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ButtonBase } from '@material-ui/core';
import styled from 'styled-components';
import { withRequest } from '../../HOCs/withRequest';

const LessonWrapper = styled.div`
  padding: 10px;
`;

const ButtonItem = styled(ButtonBase)`
  width: 100%;
  justify-content: start;
`;

const LessonsFn = ({ request, onClick }) => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    (async () => {
      await request(async () => {
        const lessons = await getLessons();

        setLessons(lessons);
      });
    })();
  }, [request]);

  return (
    <div>
      <GridList cols={3} spacing={10} cellHeight="auto">
        {lessons.map(({ date }) => (
          <GridListTile key={date}>
            <Paper>
              <ButtonItem onClick={() => onClick(date)}>
                <LessonWrapper>
                  <Typography>{date}</Typography>
                </LessonWrapper>
              </ButtonItem>
            </Paper>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

const Lessons = withRequest(LessonsFn);

export default Lessons;
