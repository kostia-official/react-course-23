import { getUser } from '../actions/user';
import { createReducer } from '@reduxjs/toolkit';

export const user = createReducer(
  {
    data: {},
    isLoading: false
  },
  {
    [getUser.pending]: (state) => ({ ...state, isLoading: true }),
    [getUser.fulfilled]: (state, action) => ({
      ...state,
      data: action.payload.user,
      isLoading: false
    })
  }
);
