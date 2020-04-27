import axios from 'axios';
import { Auth } from './services/auth';

const api = axios.create({
  baseURL: 'https://memeization-staging.herokuapp.com'
});

api.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${Auth.getToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);

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

export const signUp = async ({ email, name, password }) => {
  const { data } = await api.post('/users', { email, name, password });

  return data;
};

export const signIn = async ({ email, password }) => {
  const { data } = await api.post('/signin', { email, password });

  return data;
};
