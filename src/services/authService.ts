import { toast } from 'react-toastify';
import { loginUserAsync } from '../api/auth';
import { apiCallBegan } from '../store/actions/api';
import {
  authRequestEnded,
  authRequestFailed,
  authRequestStarted,
  authRequestSuccess,
} from '../store/slices/auth';
import { USER_EMAIL } from '../utlis/constants/constants';
import routes from '../utlis/routes';
import storage from './storageService';

const url = '/auth';
export const loginUser = (data: any, router: any) => async (dispatch: any) => {
  dispatch(
    apiCallBegan({
      url: `${url}/login`,
      method: 'POST',
      data,
      onStart: authRequestStarted.type,
      onError: authRequestFailed.type,
      showErrorToast: true,
      successAction: (payload: { user: any; token: string }) => {
        const { token, user } = payload;
        if (!user.isVerified) {
          storage.set(USER_EMAIL, user.email);
          toast.info('Please verify your email');
          router.push(routes.emailSent);
          dispatch(
            authRequestFailed({
              message: 'Please verify your email address',
            }),
          );
          return;
        }
        dispatch(authRequestSuccess(user));
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

export const getCurrentUser = (router: any) => async (dispatch: any) => {
  dispatch(
    apiCallBegan({
      url: `${url}/me`,
      onStart: authRequestStarted.type,
      onSuccess: authRequestSuccess.type,
      onError: authRequestFailed.type,
      showErrorToast: true,
      successAction: (payload: { user: any; token: string }) => {
        const { token } = payload;
        storage.setAuthToken(token);
      },
      errorAction: () => {
        storage.removeAuthToken();
        router.push(routes.login);
      },
    }),
  );
};

export const registerUser =
  (data: any, router: any) => async (dispatch: any) => {
    dispatch(
      apiCallBegan({
        url: `users/register`,
        method: 'POST',
        data,
        onStart: authRequestStarted.type,
        onError: authRequestFailed.type,
        showErrorToast: true,
        successAction: (payload: { user: any; token: string }) => {
          const { user } = payload;
          storage.set(USER_EMAIL, user.email);
          router.push(routes.emailSent);
          dispatch(authRequestEnded());
          toast.success('Verification email sent, please check your inbox');
        },
      }),
    );
  };

export const resendVerificationEmail =
  (data: any, router: any) => async (dispatch: any) => {
    dispatch(
      apiCallBegan({
        url: `${url}/resend-verification-email`,
        method: 'POST',
        data,
        onStart: authRequestStarted.type,
        onError: authRequestFailed.type,
        showErrorToast: true,
        successAction: () => {
          router.push(routes.emailSent);
          toast.success('Verification email sent, please check your inbox');
          dispatch(authRequestEnded());
        },
      }),
    );
  };

export const verifyEmail =
  (data: any, router: any) => async (dispatch: any) => {
    dispatch(
      apiCallBegan({
        url: `${url}/verify-email`,
        method: 'POST',
        data,
        onStart: authRequestStarted.type,
        showErrorToast: true,
        successAction: (payload: { user: any; token: string }) => {
          const { token } = payload;
          storage.setAuthToken(token);
          router.push(routes.home);
          toast.success('Account verified successfully');
        },
        errorAction: (error: any) => {
          storage.removeAuthToken();
          router.push(routes.login);
          dispatch(authRequestFailed(error));
        },
      }),
    );
  };
