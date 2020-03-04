import React from "react";
import _ from "lodash";
import students from "../../students";
import { RandomAnswerer } from "../RandomAnswerer/RandomAnswerer";
import { StudentsTable } from "../StudentsTable/StudentsTable";
import { CenterText } from "../CenterText/CenterText";
import { Header } from "../Header/Header";
import styles from "./App.module.scss";
import { Persist } from "react-persist";

class App extends React.PureComponent {
  state = {
    students
  };

  updateById = (id, updater) => {
    this.setState(state => {
      const updatedStudent = _.map(state.students, student => {
        if (student.id !== id) return student;

        const updated = updater(student);
        return { ...student, ...updated };
      });

      return {
        students: updatedStudent
      };
    });
  };

  addScore({ id, score }) {
    this.updateById(id, student => ({
      score: student.score + score
    }));
  }

  setAbsent = id => {
    this.updateById(id, () => ({ isAbsent: true }));
  };

  setPresent = id => {
    this.updateById(id, () => ({ isAbsent: false }));
  };

  restoreAbsence = () => {
    this.setState(state => {
      return {
        students: _.map(state.students, student => ({
          ...student,
          isAbsent: false
        }))
      };
    });
  };

  render() {
    const presentStudents = _.filter(this.state.students, ({ isAbsent }) => !isAbsent);
    const absentStudents = _.filter(this.state.students, ({ isAbsent }) => isAbsent);

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
            <div className={styles.presentStudentsListContainer}>
              <StudentsTable
                students={presentStudents}
                actions={[
                  {
                    icon: "close",
                    tooltip: "Отсутсвует",
                    onClick: (event, { id }) => this.setAbsent(id)
                  },
                  {
                    icon: "restore",
                    tooltip: "Сбросить",
                    isFreeAction: true,
                    onClick: (event, { id }) => this.restoreAbsence(id)
                  }
                ]}
              />
            </div>

            <StudentsTable
              title="Отсутствующие"
              students={absentStudents}
              actions={[
                {
                  icon: "add",
                  tooltip: "Добавить обратно",
                  onClick: (event, { id }) => this.setPresent(id)
                }
              ]}
            />
          </div>

          <div className={styles.randomAnswererContainer}>
            <CenterText>
              <RandomAnswerer
                answerers={presentStudents}
                onAnswer={({ id, score }) => {
                  this.addScore({ id, score });
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
