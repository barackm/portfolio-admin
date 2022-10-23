import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../Header';
import Sidebar from '../Sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  const { isSidebarOpen } = useSelector((state: any) => state.entites.ui);

  return (
    <div>
      <Sidebar />
      <main
        className={`relative h-full max-h-screen transition-all duration-300 ease-soft-in-out rounded-xl ${
          isSidebarOpen ? 'xl:ml-72' : 'xl:ml-16'
        } bg-[rgb(248 249 250)] px-7 py-6`}
      >
        <Header />
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
