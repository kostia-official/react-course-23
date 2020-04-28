import { signUp, signIn, signOut } from '../actions/user';
import { createReducer } from '@reduxjs/toolkit';
import { Auth } from '../services/auth';

const authenticate = (state, action) => ({
  ...state,
  data: action.payload.user,
  isAuthenticated: true
});

export const user = createReducer(
  { data: null, isLoading: false, isAuthenticated: Auth.isAuthenticated() },
  {
    [signUp.fulfilled]: authenticate,
    [signIn.fulfilled]: authenticate,
    [signOut]: (state) => ({ ...state, data: null, isAuthenticated: false })
  }
);

export const getUserId = (state) => {
  return state.user.data?.id;
};
