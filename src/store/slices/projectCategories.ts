import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'projectCategories',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
    error: null,
  },
  reducers: {
    projectCategoriesRequestStarted: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    projectCategoriesLoaded: (state: any, action: any) => {
      state.loading = false;
      state.list = action.payload;
      state.lastFetch = Date.now();
    },
    projectCategoriesRequestFailed: (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload;
    },
    projectCategoryAdded: (state: any, action: any) => {
      state.list.unshift(action.payload);
      state.loading = false;
      state.error = null;
    },
    projectCategoryUpdated: (state: any, action: any) => {
      const { _id } = action.payload;
      const index = state.list.findIndex(
        (projectCategory: any) => projectCategory._id === _id,
      );
      state.list[index] = action.payload;
      state.loading = false;
      state.error = null;
    },

    projectCategoryDeleted: (state: any, action: any) => {
      const { _id } = action.payload;
      const index = state.list.findIndex(
        (projectCategory: any) => projectCategory._id === _id,
      );
      state.list.splice(index, 1);
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  projectCategoriesRequestStarted,
  projectCategoriesLoaded,
  projectCategoriesRequestFailed,
  projectCategoryAdded,
  projectCategoryUpdated,
  projectCategoryDeleted,
} = slice.actions;

export default slice.reducer;
