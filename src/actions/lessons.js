import * as api from '../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getLessons = createAsyncThunk('lessons/getLessons', () => api.getLessons());
