import React from "react";
import styled from "styled-components";
import students from "../../students";
import { RandomAnswerer } from "../RandomAnswerer/RandomAnswerer";
import { StudentsList } from "../StudentsList/StudentsList";
import { CenterText } from "../CenterText/CenterText";

const leftBarWith = 230;

const StudentsListContainer = styled.div`
  position: fixed;

  width: ${leftBarWith}px;
  height: 100%;
  top: 0;

  border-right-color: dimgrey;
  border-right-width: 1px;
  border-right-style: solid;
`;

const RandomAnswererContainer = styled.div`
  margin-left: ${leftBarWith}px;
`;

function App() {
  return (
    <div>
      <StudentsListContainer>
        <StudentsList students={students} />
      </StudentsListContainer>

      <RandomAnswererContainer>
        <CenterText>
          <RandomAnswerer answerers={students} />
        </CenterText>
      </RandomAnswererContainer>
    </div>
  );
}

export default App;
