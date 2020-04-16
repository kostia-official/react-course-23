import * as api from '../api';

export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_USER_START' });
    const user = await api.getUser();

    dispatch({ type: 'GET_USER_SUCCESS', payload: { user } });
  } catch (error) {
    dispatch({ type: 'GET_USER_FAIL', payload: { error } });
  }
};
