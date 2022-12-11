import { createSlice } from '@reduxjs/toolkit';
import { EUserRole, EUserStatus } from '../../types/common';

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
      const roles: any = user?.roleObjects
        ? user.roleObjects.map((role: any) => role.name)
        : [];

      const isUserActive = user?.status === EUserStatus.active;
      const isUserAdmin = roles.includes(EUserRole.admin);
      const isUserContentCreator = roles.includes(EUserRole.contentCreator);

      state.loading = false;
      state.currentUser = user
        ? {
            ...user,
            isUserActive,
            isUserAdmin,
            isUserContentCreator,
          }
        : null;
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
