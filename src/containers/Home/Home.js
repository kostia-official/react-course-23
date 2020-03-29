import React from 'react';
import _ from 'lodash';
import * as api from '../../api';
import { RandomAnswerer } from '../../components/RandomAnswerer/RandomAnswerer';
import { StudentsList } from '../../components/StudentsList/StudentsList';
import { CenterText } from '../../components/CenterText/CenterText';
import styles from './Home.module.scss';
import { CardModal } from '../../components/CardModal/CardModal';
import { SetAbsentModalContent } from '../../components/SetAbsentModalContent/SetAbsentModalContent';
import { withErrorMessage } from '../../HOCs/withErrorMessage';
import { withLoader } from '../../HOCs/withLoader';

class Home extends React.Component {
  state = {
    students: [],
    isShowSetAbsentModal: false
  };

  async componentDidMount() {
    try {
      this.props.setIsLoading(true);
      await this.syncStudents();
    } catch (err) {
      await this.handleError(err);
    } finally {
      this.props.setIsLoading(false);
    }
  }

  syncStudents = async () => {
    const students = await api.getStudents();

    this.setState({
      students
    });
  };

  updateStudent = (id, updater) => {
    this.setState((state) => {
      return {
        students: _.map(state.students, (student) => {
          if (student.id !== id) return student;

          return {
            ...student,
            ...updater(student)
          };
        })
      };
    });
  };

  addScore = async (id, score) => {
    try {
      this.updateStudent(id, (student) => ({
        score: student.score + score
      }));

      await api.addScore(id, score);
    } catch (err) {
      await this.handleError(err);
    }
  };

  setAbsentStatus = async (id) => {
    try {
      this.updateStudent(id, () => ({ isPresent: false }));

      await api.unsetPresentStatus(id);
    } catch (err) {
      await this.handleError(err);
    }
  };

  setPresentStatus = async (id) => {
    try {
      this.updateStudent(id, () => ({ isPresent: true }));

      await api.setPresentStatus(id);
    } catch (err) {
      await this.handleError(err);
    }
  };

  resetAbsentStatus = async () => {
    try {
      const students = _.cloneDeep(this.state.students);

      this.setState((state) => {
        return {
          students: _.map(state.students, (student) => {
            return {
              ...student,
              isPresent: true
            };
          })
        };
      });

      const promises = _.map(students, async ({ id, isPresent }) => {
        if (!isPresent) {
          await api.setPresentStatus(id);
        }
      });

      await Promise.all(promises);
    } catch (err) {
      await this.handleError(err);
    }
  };

  handleError = async (err) => {
    this.props.setErrorMessage(err);
    await this.syncStudents();
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
    const { students } = this.state;
    const presentStudents = _.filter(students, { isPresent: true });
    const absentStudents = _.filter(students, { isPresent: false });

    return (
      <>
        {this.state.isShowSetAbsentModal && (
          <CardModal onClose={this.closeSetAbsentModal}>
            <SetAbsentModalContent
              students={students}
              setAbsentStatus={this.setAbsentStatus}
              setPresentStatus={this.setPresentStatus}
            />
          </CardModal>
        )}

        <div className={styles.appContainer}>
          <div className={styles.studentsListsContainer}>
            <div className={styles.studentsListContainer}>
              <StudentsList
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

            <StudentsList
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

export default withErrorMessage(withLoader(Home));
