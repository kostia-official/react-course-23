import React from 'react';
import _ from 'lodash';
import { RandomAnswerer } from '../../components/RandomAnswerer/RandomAnswerer';
import { StudentsTable } from '../../components/StudentsTable/StudentsTable';
import { CenterText } from '../../components/CenterText/CenterText';
import styles from './Home.module.scss';
import { CardModal } from '../../components/CardModal/CardModal';
import { AttendanceFromZoom } from '../AttendanceFromZoom/AttendanceFromZoom';
import { students as studentsReducer } from '../../reducers/students';
import {
  getStudents,
  setPresentStatus,
  addScore,
  unsetPresentStatus
} from '../../actions/students';
import { connect } from 'react-redux';

class Home extends React.Component {
  state = {
    isShowSetAbsentModal: false
  };

  componentDidMount() {
    this.syncStudents();
  }

  syncStudents = () => {
    this.props.getStudents();
  };

  updateStudent = (id, updater) => {
    const studentsToUpdate = _.map(this.props.students, (student) => {
      if (student.id !== id) return student;

      return {
        ...student,
        ...updater(student)
      };
    });

    this.props.updateStudents(studentsToUpdate);
  };

  addScore = (id, score) => {
    this.updateStudent(id, (student) => ({
      score: student.score + score
    }));

    this.props.addScore({ id, score });
  };

  setAbsentStatus = (id) => {
    const student = _.find(this.props.students, { id });
    if (!student.isPresent) return;

    this.updateStudent(id, () => ({ isPresent: false }));

    this.props.unsetPresentStatus(id);
  };

  setPresentStatus = (id) => {
    const student = _.find(this.props.students, { id });
    if (student.isPresent) return;

    this.updateStudent(id, () => ({ isPresent: true }));

    this.props.setPresentStatus(id);
  };

  resetAbsentStatus = async () => {
    const students = _.cloneDeep(this.props.students);

    this.props.resetAbsentStatus();

    const promises = _.map(students, async ({ id, isPresent }) => {
      if (!isPresent) {
        await this.props.setPresentStatus(id);
      }
    });

    await Promise.all(promises);
  };

  openSetAbsentModal = () => {
    this.setState({
      isShowSetAbsentModal: true
    });
  };

  closeSetAbsentModal = () => {
    this.setState({
      isShowSetAbsentModal: false
    });
  };

  render() {
    const { students } = this.props;
    const presentStudents = _.filter(students, { isPresent: true });
    const absentStudents = _.filter(students, { isPresent: false });

    return (
      <>
        <CardModal isShow={this.state.isShowSetAbsentModal} onClose={this.closeSetAbsentModal}>
          <AttendanceFromZoom
            students={students}
            setAbsentStatus={this.setAbsentStatus}
            setPresentStatus={this.setPresentStatus}
          />
        </CardModal>

        <div className={styles.appContainer}>
          <div className={styles.studentsListsContainer}>
            <div className={styles.studentsListContainer}>
              <StudentsTable
                title="Студенты"
                students={presentStudents}
                actions={[
                  {
                    icon: 'close',
                    tooltip: 'Отсутствует',
                    onClick: (event, rowData) => {
                      this.setAbsentStatus(rowData.id);
                    }
                  },
                  {
                    icon: 'update',
                    tooltip: 'Сбросить',
                    isFreeAction: true,
                    onClick: this.resetAbsentStatus
                  },
                  {
                    icon: 'launch',
                    tooltip: 'Отметить отсутствующих',
                    isFreeAction: true,
                    onClick: this.openSetAbsentModal
                  }
                ]}
                onScoreUpdate={this.addScore}
              />
            </div>

            <StudentsTable
              title="Отсутствующие"
              students={absentStudents}
              actions={[
                {
                  icon: 'add',
                  tooltip: 'Добавить обратно',
                  onClick: (event, rowData) => {
                    this.setPresentStatus(rowData.id);
                  }
                }
              ]}
            />
          </div>

          <div className={styles.randomAnswererContainer}>
            <CenterText>
              <RandomAnswerer
                answerers={presentStudents}
                onAnswer={(id, score) => {
                  this.addScore(id, score);
                }}
              />
            </CenterText>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  students: state.students
});

const mapDispatchToProps = (dispatch) => ({
  updateStudents: (payload) => dispatch(studentsReducer.actions.updateStudents(payload)),
  resetAbsentStatus: () => dispatch(studentsReducer.actions.resetAbsentStatus()),
  getStudents: () => dispatch(getStudents()),
  addScore: (payload) => dispatch(addScore(payload)),
  setPresentStatus: (payload) => dispatch(setPresentStatus(payload)),
  unsetPresentStatus: (payload) => dispatch(unsetPresentStatus(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
