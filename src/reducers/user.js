import { signUp, signIn, signOut } from '../actions/user';
import { createReducer } from '@reduxjs/toolkit';
import { Auth } from '../services/auth';

const auth = (state, action) => ({
  ...state,
  data: action.payload.user,
  isLoggedIn: true
});

export const user = createReducer(
  { data: null, isLoggedIn: Auth.isLoggedIn(), isLoading: false },
  {
    [signUp.fulfilled]: auth,
    [signIn.fulfilled]: auth,
    [signOut]: (state) => ({ ...state, isLoggedIn: false, data: null })
  }
);

export const getUserId = (state) => state.user.data?.id;
