import { createSlice } from '@reduxjs/toolkit';
import { getStudents } from '../actions/students';
import _ from 'lodash';

export const students = createSlice({
  name: 'students',
  initialState: [],
  reducers: {
    updateStudents: (state, action) => {
      return action.payload;
    },
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
    [getStudents.fulfilled]: (state, action) => action.payload
  }
});
