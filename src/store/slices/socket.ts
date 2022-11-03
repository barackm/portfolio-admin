import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'socket',
  initialState: {
    io: null,
    connected: false,
  },

  reducers: {
    socketConnected: (state, action) => {
      state.io = action.payload;
      state.connected = true;
    },
    socketDisconnected: (state) => {
      state.io = null;
      state.connected = false;
    },
  },
});

export const { socketConnected, socketDisconnected } = slice.actions;
export default slice.reducer;
