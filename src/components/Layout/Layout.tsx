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
  const { currentUser } = useSelector((state: any) => state.auth);

  return (
    <div>
      {currentUser && <Sidebar />}
      <main
        className={`relative h-full max-h-screen transition-all duration-300 ease-soft-in-out rounded-xl ${
          isSidebarOpen ? 'xl:ml-72' : 'xl:ml-16'
        } bg-[rgb(248 249 250)] px-6 py-6 ${!currentUser && 'w-full xl:ml-0'}`}
      >
        {currentUser && <Header />}
        {children}
      </main>
    </div>
  );
};

export default Layout;
