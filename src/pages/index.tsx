import type { NextPage } from 'next';
import { useEffect } from 'react';

import Page from '../components/common/Page';
import { useAppSelector } from '../hooks/store';
import { useRouter } from 'next/router';
import routes from '../utlis/routes';
import LoadingScreen from '../components/LoadingScreen';

const Home: NextPage = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push(routes.login);
    } else {
      router.push(routes.dashboard);
    }
  }, [currentUser, router]);
  return (
    <Page>
      <LoadingScreen />
    </Page>
  );
};

export default Home;
