import { toast } from 'react-toastify';
import { loginUserAsync } from '../api/auth';
import { apiCallBegan } from '../store/actions/api';
import {
  authRequestFailed,
  authRequestStarted,
  authRequestSuccess,
} from '../store/slices/auth';
import { authorization } from '../utlis/constants/constants';
import { displayError, getErrorMessage } from '../utlis/errorHandler';
import routes from '../utlis/routes';
import storage from './storageService';

export const loginUser = (data: any, router: any) => async (dispatch: any) => {
  dispatch(
    apiCallBegan({
      url: '/auth/login',
      method: 'POST',
      data,
      onStart: authRequestStarted.type,
      onSuccess: authRequestSuccess.type,
      onError: authRequestFailed.type,
      showErrorToast: true,
      successAction: (payload: { user: any; token: string }) => {
        const { token } = payload;
        storage.setAuthToken(token);
        router.push(routes.home);
      },
    }),
  );
};

export const logoutUser = (router: any) => async (dispatch: any) => {
  storage.removeAuthToken();
  dispatch(authRequestSuccess(null));
  router.push(routes.login);
};

export const getCurrentUser = () => async (dispatch: any) => {
  dispatch(
    apiCallBegan({
      url: '/auth/me',
      onStart: authRequestStarted.type,
      onSuccess: authRequestSuccess.type,
      onError: authRequestFailed.type,
      showErrorToast: true,
      successAction: (payload: { user: any; token: string }) => {
        const { token } = payload;
        storage.setAuthToken(token);
      },
    }),
  );
};
