import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { verifyEmailAsync } from '../../api/auth';
import Page from '../../components/common/Page';
import LoadingScreen from '../../components/LoadingScreen';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { verifyEmail } from '../../services/authService';
import storage from '../../services/storageService';
import { authRequestSuccess } from '../../store/slices/authSlice';
import { displayError } from '../../utlis/errorHandler';
import routes from '../../utlis/routes';

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('there we go....');
    if (document.readyState === 'complete') {
      if (token) {
        verifyEmail();
      } else {
        router.push(routes.login);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, dispatch]);

  const verifyEmail = async () => {
    if (!token) {
      return;
    }
    try {
      const { data } = await verifyEmailAsync({ verificationToken: token });
      const { user, token: receivedToken } = data;
      console.log(user, receivedToken);
      dispatch(authRequestSuccess(user));
      storage.setAuthToken(receivedToken);
      router.push(routes.home);
      toast.success('Email verified successfully');
    } catch (error) {
      displayError(error);
      router.push(routes.login);
      console.log(error, 'failed');
    }
  };
  return (
    <Page>
      <LoadingScreen />
    </Page>
  );
};

export default VerifyEmail;
