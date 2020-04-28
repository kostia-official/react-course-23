import { getPosts, addPost, toggleLike } from '../actions/posts';
import { createSlice, createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { getUserId } from './user';

export const posts = createSlice({
  name: 'posts',
  initialState: { data: [], isLoading: false },
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => ({ ...state, isLoading: true }),
    [getPosts.fulfilled]: (state, action) => ({
      data: _.orderBy(action.payload.posts, ['createdAt'], ['DESC']),
      isLoading: false
    }),
    [addPost.fulfilled]: (state, action) => {
      state.data.push(action.payload.post);
    },
    [toggleLike.fulfilled]: (state, action) => {
      const { id, likes } = action.payload.post;
      const post = _.find(state.data, { id });

      post.likes = likes;
    }
  }
});

export const getPostsData = (state) => state.posts.data;

export const getPostsWithIsLikes = createSelector(getUserId, getPostsData, (userId, posts) => {
  console.log(userId);
  return _.map(posts, (post) => {
    const { likes } = post;
    return { ...post, isLiked: likes.includes(userId) };
  });
});

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

export const getCurrentUserLikesCount = createSelector(getPostsWithIsLikes, (posts) =>
  _.reduce(
    posts,
    (count, post) => {
      if (post.isLiked) return count + 1;

      return count;
    },
    0
  )
);
