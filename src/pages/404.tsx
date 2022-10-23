import Image from 'next/image';
import React from 'react';
import Lottie from 'lottie-react';
import Page from '../components/common/Page';
import Animation from '../../public/images/404.json';

const NotFound = () => {
  return (
    <Page>
      <div className='flex h-full justify-center align-middle min-h-85-screen '>
        <div className='flex flex-col w-full h-full justify-center align-middle pt-30 text-center'>
          <div>
            <Lottie animationData={Animation} className='w-1/3 mx-auto' />
          </div>
          <p>Page Not Found</p>
        </div>
      </div>
    </Page>
  );
};

export default NotFound;
