import { toast } from 'react-toastify';
import { loginUserAsync } from '../api/auth';
import { apiCallBegan } from '../store/actions/api';
import {
  authRequestEnded,
  authRequestFailed,
  authRequestStarted,
  authRequestSuccess,
} from '../store/slices/auth';
import { EUserRole, EUserStatus } from '../types/common';
import { updateToken } from '../utlis/auth';
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
      onSuccess: authRequestSuccess.type,
      showErrorToast: true,
      successAction: (payload: { user: any; token: string }) => {
        const { token, user } = payload;
        toast.success('Login successful, Welcome back');
        dispatch(authRequestSuccess(payload));
        updateToken(token);

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

        if (user.status === EUserStatus.pending) {
          toast.info('Your account is pending');
          router.push(routes.profile);
          return;
        }
        const isOnlyRegularUser =
          user.roles.length === 1 && user.roles[0].name === EUserRole.regular;
        if (isOnlyRegularUser && user.status === EUserStatus.active) {
          toast.info('Your account is pending, waiting for admin approval');
          router.push(routes.profile);
          return;
        }
        if (user.status === EUserStatus.inactive) {
          toast.info('Your account is inactive');
          router.push(routes.profile);
          return;
        }

        router.push(routes.home);
      },
    }),
  );
};

export const logoutUser = (router: any) => async (dispatch: any) => {
  updateToken(null);
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

export const forgotPassword =
  (data: any, router: any) => async (dispatch: any) => {
    dispatch(
      apiCallBegan({
        url: `${url}/forgot-password`,
        method: 'POST',
        data,
        onStart: authRequestStarted.type,
        onError: authRequestFailed.type,
        showErrorToast: true,
        successAction: () => {
          router.push(routes.login);
          toast.success('Password reset email sent, please check your inbox');
          dispatch(authRequestEnded());
        },
      }),
    );
  };

export const resetPassword =
  (data: any, router: any) => async (dispatch: any) => {
    dispatch(
      apiCallBegan({
        url: `${url}/reset-password`,
        method: 'POST',
        data,
        onStart: authRequestStarted.type,
        onError: authRequestFailed.type,
        showErrorToast: true,
        successAction: () => {
          router.push(routes.login);
          toast.success('Password reset successfully, Please login');
          dispatch(authRequestEnded());
        },
      }),
    );
  };
