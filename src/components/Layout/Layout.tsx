import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <div>
      <Sidebar />
      <main className='relative h-full max-h-screen transition-all duration-200 ease-soft-in-out rounded-xl xl:ml-72 bg-[rgb(248 249 250)]'>
        <Header />
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
