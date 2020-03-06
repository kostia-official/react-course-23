import students from "./students";
import _ from "lodash";

export const getStudents = () => {
  const studentsNames = process.env.REACT_APP_STUDENTS
    ? JSON.parse(process.env.REACT_APP_STUDENTS)
    : students;

  return _.map(studentsNames, (student, i) => {
    return {
      ...student,
      id: i,
      score: 0,
      isAbsent: false
    };
  });
};
