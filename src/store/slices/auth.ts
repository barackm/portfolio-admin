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
      state.loading = false;
      state.currentUser = user;
    },
    authRequestFailed: (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { authRequestStarted, authRequestSuccess, authRequestFailed } =
  slice.actions;

export default slice.reducer;
