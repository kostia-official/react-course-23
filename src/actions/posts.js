import * as api from '../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addPost = createAsyncThunk('posts/addPost', async (postData) => {
  const post = await api.addPost(postData);
  return { post };
});

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const posts = await api.getPosts();
  return { posts };
});
