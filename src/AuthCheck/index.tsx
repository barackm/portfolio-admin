import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import LoadingScreen from '../components/LoadingScreen';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { getCurrentUser } from '../services/authService';
import storage from '../services/storageService';

import { authRequestSuccess } from '../store/slices/authSlice';
import { socketConnected } from '../store/slices/socket';
import {
  authorization,
  AUTH_TOKEN,
  DOMAIN,
} from '../utlis/constants/constants';
import routes from '../utlis/routes';

interface AuthCheckProps {
  children: React.ReactNode;
  authData?: any;
}

const AuthCheck = (props: AuthCheckProps) => {
  const { children } = props;
  const dispatch = useAppDispatch();
  const token: any = storage.getAuthToken();
  const { loading, currentUser } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const shoudlGoToLogin = () => {
    const path = router.pathname;
    const paths = ['/auth', '/emailSent', '/verifyEmail'];
    const shouldRedirect = paths.some((p) => path.includes(p));
    return !shouldRedirect;
  };

  const getUserInfo = async () => {
    if (!token && !currentUser) {
      if (shoudlGoToLogin()) {
        router.push(routes.login);
      }
      dispatch(authRequestSuccess(null));
      return;
    }
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      toast.error('Your session has expired. Please login again.');
      dispatch(authRequestSuccess(null));
      router.push(routes.login);
      return;
    } else {
      axios.defaults.headers.common[authorization] = `Bearer ${token}`;
      document.cookie = `${AUTH_TOKEN}=${token} ; path=/`;
      dispatch(getCurrentUser(router));
    }
  };

  useEffect(() => {
    const socket = io(DOMAIN as string);

    socket.on('connect', () => {
      dispatch(socketConnected(socket));
    });
    socket.on('connect_error', (error) => {
      console.log('connect_error', error);
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{loading ? <LoadingScreen /> : children}</>;
};
export default AuthCheck;
