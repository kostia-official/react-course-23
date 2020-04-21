import React from 'react';
import _ from 'lodash';
import { RandomAnswerer } from '../../components/RandomAnswerer/RandomAnswerer';
import { StudentsTable } from '../../components/StudentsTable/StudentsTable';
import { CenterText } from '../../components/CenterText/CenterText';
import styles from './Home.module.scss';
import { CardModal } from '../../components/CardModal/CardModal';
import { AttendanceFromZoom } from '../AttendanceFromZoom/AttendanceFromZoom';
import {
  getStudents,
  addScore,
  setPresentStatus,
  unsetPresentStatus,
  syncStudents
} from '../../actions/students';
import {
  students as studentsSlice,
  getPresentStudents,
  getAbsentStudents
} from '../../reducers/students';
import { connect } from 'react-redux';

class Home extends React.Component {
  state = {
    isShowSetAbsentModal: false
  };

  componentDidMount() {
    this.props.getStudents();
  }

  handleError = (action) => {
    if (action.error) {
      this.props.syncStudents();
    }
  };

  updateStudent = (id, updater) => {
    const updatedStudents = _.map(this.props.students, (student) => {
      if (student.id !== id) return student;

      return {
        ...student,
        ...updater(student)
      };
    });

    this.props.setStudents(updatedStudents);
  };

  addScore = async (id, score) => {
    this.updateStudent(id, (student) => ({
      score: student.score + score
    }));

    this.props.addScore({ id, score }).then(this.handleError);
  };

  setAbsentStatus = async (id) => {
    const student = _.find(this.props.students, { id });
    if (!student.isPresent) return;

    this.updateStudent(id, () => ({ isPresent: false }));

    this.props.unsetPresentStatus(id).then(this.handleError);
  };

  setPresentStatus = async (id) => {
    const student = _.find(this.props.students, { id });
    if (student.isPresent) return;

    this.updateStudent(id, () => ({ isPresent: true }));

    this.props.setPresentStatus(id).then(this.handleError);
  };

  resetAbsentStatus = () => {
    const students = _.cloneDeep(this.props.students);

    this.props.resetAbsentStatus();

    _.map(students, ({ id, isPresent }) => {
      if (!isPresent) {
        this.props.setPresentStatus(id).then(this.handleError);
      }
    });
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
    const { students, presentStudents, absentStudents } = this.props;

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
  students: state.students,
  presentStudents: getPresentStudents(state),
  absentStudents: getAbsentStudents(state)
});

const actionCreators = {
  ...studentsSlice.actions,
  getStudents,
  syncStudents,
  addScore,
  setPresentStatus,
  unsetPresentStatus
};

export default connect(mapStateToProps, actionCreators)(Home);
