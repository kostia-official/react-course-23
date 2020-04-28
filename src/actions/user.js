import * as api from '../api';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { Auth } from '../services/auth';

export const getUser = createAsyncThunk('user/getUser', async () => {
  const user = await api.getUser();
  return { user };
});

export const signUp = createAsyncThunk('user/signUp', async ({ email, name, password }) => {
  const { user, accessToken } = await api.signUp({ email, name, password });

  Auth.setToken(accessToken);

  return { user };
});

export const signIn = createAsyncThunk('user/signIn', async ({ email, password }) => {
  const { user, accessToken } = await api.signIn({ email, password });

  Auth.setToken(accessToken);

  return { user };
});

export const signOut = createAction('user/signOut', () => {
  Auth.clearToken();

  return {};
});
