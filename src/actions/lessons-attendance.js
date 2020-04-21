import * as api from '../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getLessonAttendance = createAsyncThunk('lessons/getLessonAttendance', async (date) => {
  const students = await api.getStudents(date);
  return { students, date };
});
