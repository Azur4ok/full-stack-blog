import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/index';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async(id) => {
  await axios.delete(`/posts/${id}`)
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchAuth = createAsyncThunk('/auth/fetchUserData', async (params) => {
  const { data } = await axios.post('/login', params);
  return data;
});

export const fetchRegister = createAsyncThunk('/auth/fetchRegister', async (params) => {
  const { data } = await axios.post('/register', params);
  return data;
});

export const fetchIsAuth = createAsyncThunk('/auth/fetchIsAuth', async () => {
  const { data } = await axios.get('/me');
  return data;
});
