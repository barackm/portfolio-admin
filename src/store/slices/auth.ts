import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    authRequestStarted: (state: any) => {},
    authRequestSuccess: (state: any, action: any) => {},
    authRequestFailed: (state: any, action: any) => {},
  },
});

export const { authRequestStarted, authRequestSuccess, authRequestFailed } =
  slice.actions;

export default slice.reducer;
