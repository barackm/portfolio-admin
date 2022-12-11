import React from 'react';
import LoadingIndicator from '../common/LoadingIndicator';

const LoadingScreen = () => {
  return (
    <div className='flex justify-center items-center w-full h-full min-h-[80vh]'>
      <LoadingIndicator />
    </div>
  );
};

export default LoadingScreen;
