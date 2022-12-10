import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks/store';
import useAuth from '../../hooks/useAuth';
import storage from '../../services/storageService';
import { EUserRole, EUserStatus } from '../../types/common';
import routes from '../../utlis/routes';
import Header from '../Header';
import Sidebar from '../Sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  const { isSidebarOpen } = useSelector((state: any) => state.entities.ui);
  const { currentUser, loading } = useSelector((state: any) => state.auth);
  return (
    <>
      {currentUser && <Sidebar />}
      <main
        className={`relative h-full max-h-screen transition-all duration-300 ease-soft-in-out rounded-xl ${
          isSidebarOpen ? 'xl:ml-72' : 'xl:ml-16'
        } px-6 py-6 ${!currentUser && 'w-full xl:ml-0'}`}
      >
        {currentUser && <Header />}
        {!loading && children}
      </main>
    </>
  );
};

export default Layout;
