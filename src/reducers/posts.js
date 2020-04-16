import faker from 'faker';

export const posts = (state = { data: [], isLoading: false }, action) => {
  switch (action.type) {
    case 'GET_POSTS_START':
      return { ...state, isLoading: true };
    case 'GET_POSTS_SUCCESS':
      return { ...state, data: action.payload.posts, isLoading: false };
    case 'ADD_POST':
      return {
        ...state,
        data: [
          ...state.data,
          {
            id: faker.random.uuid(),
            imageUrl: action.payload.imageUrl,
            likes: 0,
            userId: action.payload.userId,
            isLiked: false
          }
        ]
      };
    case 'TOGGLE_LIKE':
      const data = state.data.map((post) => {
        if (post.id !== action.payload.postId) return post;

        const isLiked = !post.isLiked;

        return {
          ...post,
          likes: isLiked ? post.likes + 1 : post.likes - 1,
          isLiked
        };
      });

      return { ...state, data };
    default:
      return state;
  }
};
