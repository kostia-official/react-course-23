import faker from 'faker';
import { getPosts } from '../actions/posts';
import { createSlice } from '@reduxjs/toolkit';

export const posts = createSlice({
  name: 'posts',
  initialState: { data: [], isLoading: false },
  reducers: {
    addPost: (state, action) => {
      const data = [
        ...state.data,
        {
          id: faker.random.uuid(),
          imageUrl: action.payload.imageUrl,
          likes: 0,
          userId: action.payload.userId,
          isLiked: false
        }
      ];

      return { ...state, data };
    },
    toggleLike: (state, action) => {
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
    }
  },
  extraReducers: {
    [getPosts.pending]: (state) => ({ ...state, isLoading: true }),
    [getPosts.fulfilled]: (state, action) => ({ data: action.payload.posts, isLoading: false })
  }
});
