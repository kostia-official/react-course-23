import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const getPosts = createAsyncThunk('GET_POSTS', async () => {
  const posts = await api.getPosts();

  return { posts };
});

export const addPost = createAction('ADD_POST');
export const toggleLike = createAction('TOGGLE_LIKE');
