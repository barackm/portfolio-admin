import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'projects',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
    error: null,
  },
  reducers: {
    projectsRequestStarted: (state: any) => {
      state.loading = true;
      state.error = null;
    },

    projectsLoaded: (state: any, action: any) => {
      state.loading = false;
      state.list = action.payload;
      state.lastFetch = Date.now();
    },

    projectsRequestFailed: (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload;
    },

    projectAdded: (state: any, action: any) => {
      state.list.unshift(action.payload);
      state.loading = false;
      state.error = null;
    },

    projectUpdated: (state: any, action: any) => {
      const { _id } = action.payload;
      const index = state.list.findIndex((project: any) => project._id === _id);
      state.list[index] = action.payload;
      state.loading = false;
      state.error = null;
    },

    projectDeleted: (state: any, action: any) => {
      const { _id } = action.payload;
      const index = state.list.findIndex((project: any) => project._id === _id);
      state.list.splice(index, 1);
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  projectsRequestStarted,
  projectsLoaded,
  projectsRequestFailed,
  projectAdded,
  projectUpdated,
  projectDeleted,
} = slice.actions;

export default slice.reducer;
