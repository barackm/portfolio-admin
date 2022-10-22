import React from 'react';
import Page from '../components/common/Page';

const NotFound = () => {
  return (
    <Page>
      <div className='flex h-full justify-center align-middle min-h-85-screen '>
        <div className='flex w-full h-full justify-center align-middle  text-center'>
          Page Not Found
        </div>
      </div>
    </Page>
  );
};

export default NotFound;
