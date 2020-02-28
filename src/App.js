import React from "react";
import students from "./students";
import { RandomAnswerer } from "./RandomAnswerer";
import { StudentsList } from "./StudentsList";
import { CenterText } from "./CenterText";

function App() {
  return (
    <div>
      <CenterText>
        <RandomAnswerer answerers={students} />
      </CenterText>

      <hr />

      <StudentsList students={students} />
    </div>
  );
}

export default App;
