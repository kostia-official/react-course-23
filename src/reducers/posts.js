import { getPosts, addPost, toggleLike } from '../actions/posts';
import { createReducer } from '@reduxjs/toolkit';
import faker from 'faker';

export const posts = createReducer(
  { data: [], isLoading: false },
  {
    [getPosts.pending]: (state) => ({ ...state, isLoading: true }),
    [getPosts.fulfilled]: (state, action) => ({
      ...state,
      data: action.payload.posts,
      isLoading: false
    }),
    [addPost]: (state, action) => {
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
    },
    [toggleLike]: (state, action) => {
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
  }
);
