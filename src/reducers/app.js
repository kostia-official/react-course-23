import { createSlice } from '@reduxjs/toolkit';
import { getLessons } from '../actions/lessons';
import { getLessonAttendance } from '../actions/lessons-attendance';

const setError = (state, action) => ({
  ...state,
  isLoading: false,
  errorMessage: action.error.message
});
const startLoading = (state) => ({ ...state, isLoading: true });
const finishLoading = (state) => ({ ...state, isLoading: false });

export const app = createSlice({
  name: 'app',
  initialState: {
    errorMessage: '',
    isLoading: false
  },
  reducers: {
    closeError: (state) => ({ ...state, errorMessage: '' })
  },
  extraReducers: {
    [getLessons.pending]: startLoading,
    [getLessons.fulfilled]: finishLoading,
    [getLessons.rejected]: setError,
    [getLessonAttendance.pending]: startLoading,
    [getLessonAttendance.fulfilled]: finishLoading,
    [getLessonAttendance.rejected]: setError
  }
});
