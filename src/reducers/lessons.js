import { createSlice } from '@reduxjs/toolkit';
import { getLessons } from '../actions/lessons';

export const lessons = createSlice({
  name: 'lessons',
  initialState: [],
  reducers: {},
  extraReducers: {
    [getLessons.fulfilled]: (state, action) => action.payload
  }
});
