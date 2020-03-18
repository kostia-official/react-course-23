import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : 'https://wants2answer-staging.herokuapp.com',
  headers: {
    Authorization: window.localStorage.getItem('apiToken')
  }
});

export const getStudents = async (date = new Date()) => {
  const { data } = await api.get('/students/statistic', {
    params: {
      date
    }
  });

  return data;
};

export const setPresentStatus = async (studentId, date = new Date()) => {
  await api.post('/present-students', {
    studentId,
    date
  });
};

export const unsetPresentStatus = async (studentId, date = new Date()) => {
  await api.post('/present-students/unset', {
    studentId,
    date
  });
};

export const addScore = async (studentId, score) => {
  await api.post('/scores', {
    studentId,
    score
  });
};
