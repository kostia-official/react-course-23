import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const getStudents = createAsyncThunk('students/getStudents', () => api.getStudents());
export const syncStudents = createAsyncThunk('students/syncStudents', () => api.getStudents());
export const addScore = createAsyncThunk('students/addScore', ({ id, score }) =>
  api.addScore(id, score)
);
export const setPresentStatus = createAsyncThunk('students/setPresentStatus', (id) =>
  api.setPresentStatus(id)
);
export const unsetPresentStatus = createAsyncThunk('students/unsetPresentStatus', (id) =>
  api.unsetPresentStatus(id)
);
