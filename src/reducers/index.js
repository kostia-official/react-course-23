import { lessons } from './lessons';
import { lessonsAttendance } from './lessons-attendance';
import { app } from './app';
import { students } from './students';

export default {
  lessons: lessons.reducer,
  lessonsAttendance: lessonsAttendance.reducer,
  app: app.reducer,
  students: students.reducer
};
