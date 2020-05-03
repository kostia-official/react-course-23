import { signUp, signIn, signOut, getUser, closeError } from '../actions/user';
import { createReducer } from '@reduxjs/toolkit';

const authenticate = (state, action) => ({
  ...state,
  data: action.payload.user,
  isAuthenticated: true,
  accessToken: action.payload.accessToken
});

const handleError = (state, action) => ({
  ...state,
  data: null,
  isAuthenticated: false,
  accessToken: null,
  errorMessage: action.error.message
});

export const user = createReducer(
  {
    data: null,
    isLoading: false,
    isAuthenticated: false,
    errorMessage: '',
    accessToken: null
  },
  {
    [signUp.fulfilled]: authenticate,
    [signIn.fulfilled]: authenticate,
    [signOut]: (state) => ({ ...state, data: null, accessToken: null, isAuthenticated: false }),
    [getUser.fulfilled]: (state, action) => ({ ...state, data: action.payload.user }),
    [signIn.rejected]: handleError,
    [signUp.rejected]: handleError,
    [getUser.rejected]: handleError,
    [closeError]: (state) => ({ ...state, errorMessage: '' })
  }
);

export const getUserId = (state) => {
  return state.user.data?.id;
};
