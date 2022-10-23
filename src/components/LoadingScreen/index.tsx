import React from 'react';
import LoadingIndicator from '../common/LoadingIndicator';

const LoadingScreen = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen '>
      <LoadingIndicator />
    </div>
  );
};

export default LoadingScreen;
