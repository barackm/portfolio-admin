import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Page from '../../components/common/Page';
import useAuth from '../../hooks/useAuth';

const Dashbaord = () => {
  const route = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (route) {
      router.push(route);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);
  return (
    <Page>
      <div className='text-left w-full'>Main page dashboard</div>
      <div className='flex w-full justify-center mt-6'>Coming soon...</div>
    </Page>
  );
};

export default Dashbaord;
