import axios from 'axios';
import { store } from './index';

const api = axios.create({ baseURL: 'https://memeization-staging.herokuapp.com/' });

api.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().user;

    config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const signUp = async ({ email, name, password }) => {
  const { data } = await api.post('/users', { email, name, password });
  const { accessToken, user } = data;

  return { accessToken, user };
};

export const signIn = async ({ email, password }) => {
  const { data } = await api.post('/signin', { email, password });
  const { accessToken, user } = data;

  return { accessToken, user };
};

export const getPosts = async () => {
  const { data } = await api.get('/posts');

  return data;
};

export const addPost = async (post) => {
  const { data } = await api.post('/posts', post);

  return data;
};

export const toggleLike = async (id) => {
  const { data } = await api.post(`/posts/${id}/like/toggle`);

  return data;
};

export const getUser = async () => {
  const { data } = await api.get(`/users/me`);

  return data;
};
