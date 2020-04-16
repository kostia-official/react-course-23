import * as api from '../api';

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_POSTS_START' });
    const posts = await api.getPosts();

    dispatch({ type: 'GET_POSTS_SUCCESS', payload: { posts } });
  } catch (error) {
    dispatch({ type: 'GET_POSTS_FAIL', payload: { error } });
  }
};

export const addPost = (imageUrl, userId) => {
  return {
    type: 'ADD_POST',
    payload: {
      imageUrl,
      userId
    }
  };
};

export const toggleLike = (postId) => {
  return {
    type: 'TOGGLE_LIKE',
    payload: {
      postId
    }
  };
};
