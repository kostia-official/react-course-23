import { createSlice } from '@reduxjs/toolkit';
import { getLessonAttendance } from '../actions/lessons-attendance';
import _ from 'lodash';
import { setPresentStatus, unsetPresentStatus } from '../actions/students';

export const lessonsAttendance = createSlice({
  name: 'lessons-attendance',
  initialState: {},
  extraReducers: {
    [getLessonAttendance.fulfilled]: (state, action) => {
      const { date, students } = action.payload;
      const presentStudents = _.filter(students, 'isPresent');

      return { ...state, [date]: presentStudents };
    },
    [setPresentStatus.fulfilled]: () => ({}),
    [unsetPresentStatus.fulfilled]: () => ({})
  }
});
