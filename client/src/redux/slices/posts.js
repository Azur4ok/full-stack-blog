import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, fetchRemovePost, fetchTags } from '../thunks';

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    [fetchTags.pending]: (state, action) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state, action) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((post) => post._id !== action.meta.arg);
      state.tags.status = 'loading';
    },
    [fetchRemovePost.rejected]: (state, action) => {
      state.posts.status = 'error';
    },
  },
});

export const postsReducer = postsSlice.reducer;
