import React from "react";
import students from "../../students";
import { RandomAnswerer } from "../RandomAnswerer/RandomAnswerer";
import { StudentsList } from "../StudentsList/StudentsList";
import { CenterText } from "../CenterText/CenterText";
import { Header } from "../Header/Header";
import styles from "./App.module.scss";

function App() {
  return (
    <>
      <Header />

      <div className={styles.appContainer}>
        <div className={styles.studentsListContainer}>
          <StudentsList students={students} />
        </div>

        <div className={styles.randomAnswererContainer}>
          <CenterText>
            <RandomAnswerer answerers={students} />
          </CenterText>
        </div>
      </div>
    </>
  );
}

export default App;