import { createSlice } from '@reduxjs/toolkit';
import { fetchAuth, fetchIsAuth } from './../thunks/index';

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state, action) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuth.rejected]: (state, action) => {
      state.data = null;
      state.status = 'error';
    },
    [fetchIsAuth.pending]: (state, action) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchIsAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchIsAuth.rejected]: (state, action) => {
      state.data = null;
      state.status = 'error';
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
