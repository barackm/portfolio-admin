import Image from 'next/image';
import React from 'react';

interface AuthStyleWrapperProps {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
}

const AuthStyleWrapper = (props: AuthStyleWrapperProps) => {
  const { children, title, subTitle } = props;

  return (
    <div className='flex fixed top-0 left-0 right-0 bottom-0 items-start w-full h-full justify-center overflow-y-auto'>
      <div className='flex  justify-center w-[100%] sm:w-[90%] md:w-[60%] h-full lg:w-[500px] xl:w-w-[400px] 2xl:w-[500px] '>
        <div className='flex flex-col items-start w-[90%] max-w-[90%] mt-20'>
          <div className='flex w-full bg-white rounded-xl shadow-soft-3xl flex-col  py-16 px-6 pb-3'>
            <div className='flex justify-center align-middle w-full h-20 bg-primary rounded-t-xl mb-5'>
              <div className='flex justify-center flex-col align-middle w-full text-center'>
                <div className='flex justify-center align-middle w-full'>
                  <Image
                    src='/images/logo-dark.png'
                    alt='logo'
                    width={70}
                    height={70}
                  />
                </div>
                <p className='font-light text-xl mb-1'>{title}</p>
                {subTitle ? (
                  <p className='font-light text-md'>Welcome back</p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className='flex flex-col justify-center align-middle w-full mt-4'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthStyleWrapper;
