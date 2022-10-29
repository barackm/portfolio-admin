import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCurrentUserInfoAsync } from '../api/auth';
import LoadingScreen from '../components/LoadingScreen';
import { useAppDispatch } from '../hooks/store';
import storage from '../services/storageService';

import { authRequestSuccess } from '../store/slices/auth';
import { authorization } from '../utlis/constants/constants';
import { displayError } from '../utlis/errorHandler';
import routes from '../utlis/routes';

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck = (props: AuthCheckProps) => {
  const { children } = props;
  const [fetching, setFetching] = React.useState(true);
  const dispatch = useAppDispatch();
  const token: any = storage.getAuthToken();
  const router = useRouter();

  const getUserInfo = async () => {
    if (!token) {
      router.push(routes.login);
      dispatch(authRequestSuccess(null));
      setFetching(false);
      router.push(routes.login);
      return;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        toast.error('Your session has expired. Please login again.');
        setFetching(false);
        dispatch(authRequestSuccess(null));
        router.push(routes.login);
        return;
      }

      const response: any = await getCurrentUserInfoAsync();
      const { data } = response;
      const { user, token: newToken } = data;
      storage.setAuthToken(newToken);
      dispatch(authRequestSuccess(user));
      setFetching(false);
    } catch (error: any) {
      displayError(error);
      setFetching(false);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{fetching ? <LoadingScreen /> : children}</>;
};

export default AuthCheck;
