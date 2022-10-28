import type { NextPage } from 'next';
import SearchIcon from '@mui/icons-material/Search';

import styles from '../styles/Home.module.css';
import Page from '../components/common/Page';
import Table from '../components/Table/Table';
import { useEffect, useState } from 'react';
import DefaultTableHeaderInfo from '../components/common/DefaultTableHeaderInfo';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
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
