import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SeparatorLine from '../common/SeparatorLine';

const Sidebar = () => {
  return (
    <aside className='fixed inset-y-0 left-0 flex-wrap items-center justify-between block w-full p-0 my-4 transition-all duration-200 bg-orange-400 border-0 shadow-none xl:ml-4 dark:bg-gray-950 ease-soft-in-out z-990 rounded-2xl xl:translate-x-0 xl:bg-transparent -translate-x-full max-w-64 overflow-y-auto'>
      <div className='h-20'>
        <i
          className='absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 dark:text-white xl:hidden'
          aria-hidden='true'
          sidenav-close-btn=''
        ></i>
        <Link href='/'>
          <a className='flex justify-center align-middle px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700 dark:text-white text-center'>
            <Image
              src='/images/logo-dark.png'
              alt='logo'
              width={50}
              height={50}
            />
            <span className='ml-1 font-semibold transition-all duration-200 ease-soft-in-out opacity-100 text-slate-700'>
              Barack M. Dashbord
            </span>
          </a>
        </Link>
      </div>
      <SeparatorLine />
    </aside>
  );
};

export default Sidebar;
