import * as api from '../api';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { Auth } from '../services/auth';

export const signUp = createAsyncThunk('user/signUp', async ({ email, name, password }) => {
  const { accessToken, user } = await api.signUp({ email, name, password });

  Auth.setToken(accessToken);

  return { user };
});

export const signIn = createAsyncThunk('user/signIn', async ({ email, password }) => {
  const { accessToken, user } = await api.signIn({ email, password });

  Auth.setToken(accessToken);

  return { user };
});

export const signOut = createAction('user/signOut', () => {
  Auth.removeToken();

  return {};
});
