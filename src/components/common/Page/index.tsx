import React from 'react';

interface PageProps {
  children: React.ReactNode;
}

const Page = (props: PageProps) => {
  const { children } = props;
  return <div className='mt-16 min-h-screen'>{children}</div>;
};

export default Page;
