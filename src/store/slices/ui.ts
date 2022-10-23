import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'ui',
  initialState: {
    isSidebarOpen: true,
  },
  reducers: {
    toggleSidebar: (state: any) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebar: (state: any, action: any) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebar } = slice.actions;

export default slice.reducer;
