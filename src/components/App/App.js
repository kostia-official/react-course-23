import React from "react";
import _ from "lodash";
import * as api from "../../api";
import { RandomAnswerer } from "../RandomAnswerer/RandomAnswerer";
import { StudentsList } from "../StudentsList/StudentsList";
import { CenterText } from "../CenterText/CenterText";
import { Header } from "../Header/Header";
import styles from "./App.module.scss";
import { CardModal } from "../CardModal/CardModal";
import { SetAbsentModalContent } from "../SetAbsentModalContent/SetAbsentModalContent";
import { Spinner } from "../Spinner/Spinner";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

class App extends React.Component {
  state = {
    students: [],
    isShowSetAbsentModal: false,
    isLoading: true,
    errorMessage: ""
  };

  async componentDidMount() {
    await this.syncStudents();
  }

  syncStudents = async () => {
    this.setState({ isLoading: true });
    try {
      const students = await api.getStudents();

      this.setState({
        students
      });
    } catch (err) {
      await this.setErrorMessage(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  updateStudent = (id, updater) => {
    this.setState(state => {
      return {
        students: _.map(state.students, student => {
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
      this.updateStudent(id, student => ({
        score: student.score + score
      }));

      await api.addScore(id, score);
    } catch (err) {
      await this.setErrorMessage(err);
    }
  };

  setAbsentStatus = async id => {
    try {
      this.updateStudent(id, () => ({ isPresent: false }));

      await api.unsetPresentStatus(id);
    } catch (err) {
      await this.setErrorMessage(err);
    }
  };

  setPresentStatus = async id => {
    try {
      this.updateStudent(id, () => ({ isPresent: true }));

      await api.setPresentStatus(id);
    } catch (err) {
      await this.setErrorMessage(err);
    }
  };

  resetAbsentStatus = async () => {
    try {
      const students = _.cloneDeep(this.state.students);

      this.setState(state => {
        return {
          students: _.map(state.students, student => {
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
      await this.setErrorMessage(err);
    }
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

  setErrorMessage = async err => {
    this.setState({
      errorMessage: _.get(err, "response.data.message", err.message)
    });

    await this.syncStudents();
  };

  onErrorClose = () => {
    this.setState({
      errorMessage: ""
    });
  };

  render() {
    const { students, isLoading, errorMessage } = this.state;
    const presentStudents = _.filter(students, { isPresent: true });
    const absentStudents = _.filter(students, { isPresent: false });

    if (isLoading) {
      return (
        <div>
          <Header />
          <Spinner />
        </div>
      );
    }

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

        <ErrorMessage
          isShow={!!errorMessage}
          errorMessage={errorMessage}
          onClose={this.onErrorClose}
        />

        <Header />

        <div className={styles.appContainer}>
          <div className={styles.studentsListsContainer}>
            <div className={styles.studentsListContainer}>
              <StudentsList
                title="Студенты"
                students={presentStudents}
                actions={[
                  {
                    icon: "close",
                    tooltip: "Отсутствует",
                    onClick: (event, rowData) => {
                      this.setAbsentStatus(rowData.id);
                    }
                  },
                  {
                    icon: "update",
                    tooltip: "Сбросить",
                    isFreeAction: true,
                    onClick: this.resetAbsentStatus
                  },
                  {
                    icon: "launch",
                    tooltip: "Отметить отсутствующих",
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
                  icon: "add",
                  tooltip: "Добавить обратно",
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

export default App;
