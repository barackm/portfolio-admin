import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
    token: null,
  },
  reducers: {
    authRequestStarted: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    authRequestSuccess: (state: any, action: any) => {
      const { user, token } = action.payload || {};
      state.loading = false;
      state.currentUser = user;
      state.token = token;
    },
    authRequestFailed: (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload;
    },
    authRequestEnded: (state: any) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  authRequestStarted,
  authRequestSuccess,
  authRequestFailed,
  authRequestEnded,
} = slice.actions;

export default slice.reducer;
