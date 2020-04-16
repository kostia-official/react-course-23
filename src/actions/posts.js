import * as api from '../api';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const getPosts = createAsyncThunk('GET_POSTS', async () => {
  const posts = await api.getPosts();
  return { posts };
});
