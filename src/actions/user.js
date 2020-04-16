import * as api from '../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk('GET_USER', async () => {
  const user = await api.getUser();

  return { user };
});
