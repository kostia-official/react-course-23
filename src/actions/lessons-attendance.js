import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const getLessonAttendance = createAsyncThunk('lessons/getLessonAttendance', async (date) => {
  const students = await api.getStudents(date);
  return { students, date };
});
