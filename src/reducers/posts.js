import faker from 'faker';
import { getPosts } from '../actions/posts';
import { createSlice, createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { getUserId } from './user';

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
          likes: [],
          userId: action.payload.userId
        }
      ];

      return { ...state, data };
    },
    toggleLike: (state, action) => {
      const { postId, userId } = action.payload;

      const data = state.data.map((post) => {
        if (post.id !== postId) return post;

        const isLike = !_.includes(post.likes, userId);
        const likes = isLike
          ? [...post.likes, userId]
          : _.filter(post.likes, (likedBy) => likedBy !== userId);

        return { ...post, likes };
      });

      return { ...state, data };
    }
  },
  extraReducers: {
    [getPosts.pending]: (state) => ({ ...state, isLoading: true }),
    [getPosts.fulfilled]: (state, action) => ({ data: action.payload.posts, isLoading: false })
  }
});

export const getPostsData = (state) => state.posts.data;

export const getPostsWithIsLiked = createSelector(getUserId, getPostsData, (userId, posts) => {
  return _.map(posts, (post) => ({ ...post, isLiked: _.includes(post.likes, userId) }));
});

export const getCurrentUserPostsCount = (state) => {
  const ownUserId = getUserId(state);

  return _.reduce(
    state.posts.data,
    (count, post) => {
      if (post.userId !== ownUserId) return count;

      return count + 1;
    },
    0
  );
};

export const getCurrentUserLikesCount = createSelector(getPostsWithIsLiked, (posts) => {
  return _.reduce(posts, (count, post) => (post.isLiked ? count + 1 : count), 0);
});
