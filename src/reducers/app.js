import { createSlice } from '@reduxjs/toolkit';
import { getLessons } from '../actions/lessons';
import { getLessonAttendance } from '../actions/lessons-attendance';
import { getStudents, addScore, setPresentStatus, unsetPresentStatus } from '../actions/students';

const startLoading = (state) => ({ ...state, isLoading: true });
const finishLoading = (state) => ({ ...state, isLoading: false });
const setErrorMessage = (state, action) => ({
  ...state,
  errorMessage: action.error.message,
  isLoading: false
});

export const app = createSlice({
  name: 'app',
  initialState: {
    isLoading: false,
    errorMessage: ''
  },
  reducers: {
    errorClose: (state) => ({ ...state, errorMessage: '' })
  },
  extraReducers: {
    [getLessons.pending]: startLoading,
    [getLessons.fulfilled]: finishLoading,
    [getLessons.rejected]: setErrorMessage,
    [getLessonAttendance.pending]: startLoading,
    [getLessonAttendance.fulfilled]: finishLoading,
    [getLessonAttendance.rejected]: setErrorMessage,
    [getStudents.pending]: startLoading,
    [getStudents.fulfilled]: finishLoading,
    [getStudents.rejected]: setErrorMessage,
    [addScore.rejected]: setErrorMessage,
    [setPresentStatus.rejected]: setErrorMessage,
    [unsetPresentStatus.rejected]: setErrorMessage
  }
});
