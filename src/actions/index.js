export const addPost = ({ imageUrl, userId }) => ({
  type: 'ADD_POST',
  payload: {
    imageUrl,
    userId
  }
});

export const toggleLike = (id) => ({
  type: 'TOGGLE_LIKE',
  payload: {
    id
  }
});
