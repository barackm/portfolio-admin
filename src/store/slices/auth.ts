import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    authRequestStarted: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    authRequestSuccess: (state: any, action: any) => {
      const { user } = action.payload || {};
      console.log(user, 'user');
      state.loading = false;
      state.currentUser = user;
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
