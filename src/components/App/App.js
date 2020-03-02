import React from "react";
import styled from "styled-components";
import students from "../../students";
import { RandomAnswerer } from "../RandomAnswerer/RandomAnswerer";
import { StudentsList } from "../StudentsList/StudentsList";
import { CenterText } from "../CenterText/CenterText";

import styles from "./App.module.scss";

const AppContainer = styled.div`
  display: flex;
`;

const width = 230;

const StudentsListContainer = styled.div`
  width: ${width}px;
  height: 100vh;

  border-right-color: dimgrey;
  border-right-width: 1px;
  border-right-style: solid;

  padding-left: 10px;
`;

const RandomAnswererContainer = styled.div`
  flex-grow: 1;
`;

function App() {
  return (
    <AppContainer>
      <StudentsListContainer>
        <StudentsList students={students} />
      </StudentsListContainer>

      <RandomAnswererContainer>
        <CenterText>
          <RandomAnswerer answerers={students} />
        </CenterText>
      </RandomAnswererContainer>
    </AppContainer>
  );
}

export default App;
