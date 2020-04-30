import { signUp, signIn, signOut, getUser } from '../actions/user';
import { createSlice } from '@reduxjs/toolkit';

const authenticate = (state, action) => ({
  ...state,
  data: action.payload.user,
  accessToken: action.payload.accessToken,
  isAuthenticated: true
});

const handleError = (state, action) => ({
  ...state,
  errorMessage: action.error.message,
  isAuthenticated: false
});

export const user = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isLoading: false,
    errorMessage: '',
    isAuthenticated: false,
    accessToken: null
  },
  reducers: {
    closeError: (state) => ({ ...state, errorMessage: '' })
  },
  extraReducers: {
    [signOut]: (state) => ({ ...state, data: null, isAuthenticated: false }),
    [signUp.fulfilled]: authenticate,
    [signIn.fulfilled]: authenticate,
    [getUser.fulfilled]: (state, action) => ({
      ...state,
      data: action.payload.user,
      isAuthenticated: true
    }),
    [signUp.rejected]: handleError,
    [signIn.rejected]: handleError,
    [getUser.rejected]: handleError
  }
});

export const getUserId = (state) => state.user.data?.id;

export const isAuthenticated = (state) => state.user.isAuthenticated;
