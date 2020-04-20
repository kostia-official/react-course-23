import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const getLessons = createAsyncThunk('lessons/getLessons', () => api.getLessons());
