import React from "react";
import _ from "lodash";
import { Persist } from "../Persist/Persist";
import { getStudents } from "../../data/getStudents";
import { RandomAnswerer } from "../RandomAnswerer/RandomAnswerer";
import { StudentsList } from "../StudentsList/StudentsList";
import { CenterText } from "../CenterText/CenterText";
import { Header } from "../Header/Header";
import styles from "./App.module.scss";

class App extends React.Component {
  state = {
    students: getStudents()
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

  addScore(id, score) {
    this.updateStudent(id, student => ({
      score: student.score + score
    }));
  }

  setScore = (id, score) => {
    this.updateStudent(id, () => ({ score }));
  };

  setAbsentStatus = id => {
    this.updateStudent(id, () => ({ isAbsent: true }));
  };

  setPresentStatus = id => {
    this.updateStudent(id, () => ({ isAbsent: false }));
  };

  resetAbsentStatus = () => {
    this.setState(state => {
      return {
        students: _.map(state.students, student => {
          return {
            ...student,
            isAbsent: false
          };
        })
      };
    });
  };

  render() {
    const { students } = this.state;
    const presentStudents = _.filter(students, { isAbsent: false });
    const absentStudents = _.filter(students, { isAbsent: true });

    return (
      <>
        <Persist
          name="app"
          data={this.state}
          debounce={500}
          onMount={data => this.setState(data)}
        />

        <Header />

        <div className={styles.appContainer}>
          <div className={styles.studentsListsContainer}>
            <div className={styles.studentsListContainer}>
              <StudentsList
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
