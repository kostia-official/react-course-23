import students from "./students";

export const getStudents = () => {
  return process.env.REACT_APP_STUDENTS
    ? JSON.parse(process.env.REACT_APP_STUDENTS)
    : students;
};
