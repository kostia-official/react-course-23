import { getPosts, addPost } from '../actions/posts';
import { createSlice, createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { getUserId } from './user';

export const posts = createSlice({
  name: 'posts',
  initialState: { data: [], isLoading: false },
  reducers: {
    toggleLike: (state, action) => {
      const { userId, postId } = action.payload;

      const post = _.find(state.data, { id: postId });
      const isLiked = _.includes(post.likes, userId);

      post.likes = isLiked ? post.likes.filter((like) => like !== userId) : [...post.likes, userId];
    }
  },
  extraReducers: {
    [addPost.fulfilled]: (state, action) => {
      state.data.push(action.payload.post);
    },
    [getPosts.pending]: (state) => ({ ...state, isLoading: true }),
    [getPosts.fulfilled]: (state, action) => ({ data: action.payload.posts, isLoading: false })
  }
});

export const getPostsData = (state) => state.posts.data;

export const getPostsWithIsLiked = createSelector(getUserId, getPostsData, (userId, posts) =>
  _.map(posts, (post) => {
    const { likes } = post;
    return { ...post, isLiked: likes.includes(userId) };
  })
);

export const getCurrentUserPostsCount = createSelector(getUserId, getPostsData, (userId, posts) =>
  _.reduce(
    posts,
    (count, post) => {
      if (post.userId !== userId) return count;

      return count + 1;
    },
    0
  )
);

export const getCurrentUserLikesCount = createSelector(getPostsWithIsLiked, (posts) =>
  _.reduce(
    posts,
    (count, post) => {
      if (post.isLiked) return count + 1;

      return count;
    },
    0
  )
);
