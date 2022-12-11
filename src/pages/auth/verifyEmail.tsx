import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { verifyEmailAsync } from '../../api/auth';
import Page from '../../components/common/Page';
import LoadingScreen from '../../components/LoadingScreen';
import { useAppDispatch } from '../../hooks/store';
import { authRequestSuccess } from '../../store/slices/authSlice';
import { updateToken } from '../../utlis/authUtils';
import { displayError } from '../../utlis/errorHandler';
import routes from '../../utlis/routes';

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (document.readyState === 'complete') {
      dispatch(authRequestSuccess(null));
      updateToken(null);

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
      const { token: receivedToken } = data;
      dispatch(authRequestSuccess(data));
      updateToken(receivedToken);
      router.push(routes.home);
      toast.success('Email verified successfully');
    } catch (error) {
      displayError(error);
      router.push(routes.login);
    }
  };
  return (
    <Page>
      <LoadingScreen />
    </Page>
  );
};

export default VerifyEmail;
