import { toast } from 'react-toastify';
import { loginUserAsync } from '../api/auth';
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
  dispatch(authRequestStarted());

  try {
    const { data: userData } = await loginUserAsync({
      email: data.email,
      password: data.password,
    });
    const { user, token } = userData;
    dispatch(authRequestSuccess(user));
    storage.setAuthToken(token);
    router.push(routes.home);
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    displayError(error);
    dispatch(authRequestFailed(errorMessage));
  }
};

export const logoutUser = (router: any) => async (dispatch: any) => {
  storage.removeAuthToken();
  dispatch(authRequestSuccess(null));
  router.push(routes.login);
};
