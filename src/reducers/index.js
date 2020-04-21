import { lessons } from './lessons';
import { lessonsAttendance } from './lessons-attendance';
import { app } from './app';
import { students } from './students';

export default {
  lessons: lessons.reducer,
  app: app.reducer,
  lessonsAttendance: lessonsAttendance.reducer,
  students: students.reducer
};
