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
