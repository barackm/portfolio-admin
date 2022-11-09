import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import { getCurrentUserInfoAsync } from '../api/auth';
import LoadingScreen from '../components/LoadingScreen';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { getCurrentUser } from '../services/authService';
import http from '../services/httpService';
import storage from '../services/storageService';

import { authRequestSuccess } from '../store/slices/auth';
import { socketConnected } from '../store/slices/socket';
import {
  API_END_POINT,
  authorization,
  AUTH_TOKEN,
} from '../utlis/constants/constants';
import routes from '../utlis/routes';

const socket = io(API_END_POINT as string);
interface AuthCheckProps {
  children: React.ReactNode;
  authData?: any;
}

const AuthCheck = (props: AuthCheckProps) => {
  const { children } = props;
  const dispatch = useAppDispatch();
  // token is coming from the cookie
  // get cookie called authToken
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
    // add token to cookie to all request and paths
    
    document.cookie = `${AUTH_TOKEN}=${token} ; path=/`;
      dispatch(getCurrentUser(router));
    }
  };

  useEffect(() => {
    const socket = io('http://localhost:3900/' as string);

    socket.on('connect', () => {
      console.log('connected');
      dispatch(socketConnected(socket));
    });
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
    socket.on('connect_error', (error) => {
      console.log('connect_error+++', error);
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
