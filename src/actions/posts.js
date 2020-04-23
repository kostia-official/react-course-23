import * as api from '../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getPosts = createAsyncThunk('GET_POSTS', async () => {
  const posts = await api.getPosts();
  return { posts };
});
