import React from "react";
import _ from "lodash";
import { RandomAnswerer } from "../RandomAnswerer/RandomAnswerer";
import { StudentsList } from "../StudentsList/StudentsList";
import { CenterText } from "../CenterText/CenterText";
import { Header } from "../Header/Header";
import styles from "./App.module.scss";
import { CardModal } from "../CardModal/CardModal";
import { SetAbsentModalContent } from "../SetAbsentModalContent/SetAbsentModalContent";
import * as api from "../../api";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Spinner } from "../Spinner/Spinner";

class App extends React.Component {
  state = {
    students: [],
    isShowSetAbsentModal: false,
    errorMessage: ""
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const students = await api.getStudents();

      this.setState({
        students
      });
    } catch (err) {
      this.showErrorMessage(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

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

  async addScore(id, score) {
    try {
      this.updateStudent(id, student => ({
        score: student.score + score
      }));

      await api.addScore(id, score);
    } catch (err) {
      this.showErrorMessage(err);
    }
  }

  setScore = async ({ id, oldScore, newScore }) => {
    try {
      this.updateStudent(id, () => ({ score: newScore }));

      await api.addScore(id, newScore - oldScore);
    } catch (err) {
      this.showErrorMessage(err);
    }
  };

  setAbsentStatus = async id => {
    try {
      this.updateStudent(id, () => ({ isPresent: false }));

      await api.setAbsentStatus(id);
    } catch (err) {
      this.showErrorMessage(err);
    }
  };

  setPresentStatus = async id => {
    try {
      this.updateStudent(id, () => ({ isPresent: true }));

      await api.setPresentStatus(id);
    } catch (err) {
      this.showErrorMessage(err);
    }
  };

  resetAbsentStatus = async () => {
    try {
      const students = { ...this.state.students };

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

      await Promise.all(
        _.map(students, async student => {
          if (!student.isPresent) {
            await api.setPresentStatus(student.id);
          }
        })
      );
    } catch (err) {
      this.showErrorMessage(err);
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

  onErrorClose = () => {
    this.setState({
      errorMessage: ""
    });
  };

  showErrorMessage = err => {
    this.setState({
      errorMessage: _.get(err, "response.data.message", err.message)
    });
  };

  render() {
    const { students, isLoading } = this.state;
    const presentStudents = _.filter(students, { isPresent: true });
    const absentStudents = _.filter(students, { isPresent: false });

    if (isLoading) {
      return (
        <>
          <Spinner />
          <Header />
        </>
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
          errorMessage={this.state.errorMessage}
          isShow={!!this.state.errorMessage}
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
                onScoreUpdate={this.setScore}
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
