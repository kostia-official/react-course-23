import { createSlice } from '@reduxjs/toolkit';
import { getStudents, syncStudents } from '../actions/students';
import _ from 'lodash';

export const students = createSlice({
  name: 'students',
  initialState: [],
  reducers: {
    setStudents: (state, action) => action.payload,
    resetAbsentStatus: (state) => {
      return _.map(state, (student) => {
        return {
          ...student,
          isPresent: true
        };
      });
    }
  },
  extraReducers: {
    [getStudents.fulfilled]: (state, action) => action.payload,
    [syncStudents.fulfilled]: (state, action) => action.payload
  }
});

export const getPresentStudents = (state) => _.filter(state.students, { isPresent: true });
export const getAbsentStudents = (state) => _.filter(state.students, { isPresent: false });
