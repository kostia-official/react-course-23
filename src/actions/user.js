import * as api from '../api';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk('user/getUser', async () => {
  const user = await api.getUser();
  return { user };
});

export const signUp = createAsyncThunk('user/signUp', async ({ email, name, password }) => {
  const { user, accessToken } = await api.signUp({ email, name, password });

  return { user, accessToken };
});

export const signIn = createAsyncThunk('user/signIn', async ({ email, password }) => {
  const { user, accessToken } = await api.signIn({ email, password });

  return { user, accessToken };
});

export const signOut = createAction('user/signOut');

export const closeError = createAction('user/closeError');
