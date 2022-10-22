import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SeparatorLine from '../common/SeparatorLine';

const Sidebar = () => {
  const [activeLink, setActiveLink] = React.useState('home');
  const links = [
    {
      id: 1,
      name: 'Home',
      link: '/',
      icon: <HomeOutlinedIcon />,
    },
    {
      id: 2,
      name: 'Analytics',
      link: '/analytics',
      icon: <EqualizerOutlinedIcon />,
    },
    {
      id: 3,
      name: 'Projects',
      link: '/projects',
      icon: <ListAltOutlinedIcon />,
    },
    {
      id: 4,
      name: 'Blog',
      link: '/blog',
      icon: <BookOutlinedIcon />,
    },
    {
      id: 5,
      name: 'Users',
      link: '/users',
      icon: <PeopleAltOutlinedIcon />,
    },
  ];

  const secondaryLinks = [
    {
      id: 1,
      name: 'Settings',
      link: '/settings',
      icon: <SettingsOutlinedIcon />,
    },
  ];
  console.log(activeLink);

  return (
    <aside className='fixed inset-y-0 left-0 top-2 bottom-2 ml-2 flex-wrap items-center justify-between w-full p-0  transition-all duration-200  border-0 shadow-none dark:bg-gray-950 ease-soft-in-out z-990  xl:translate-x-0 xl:bg-transparent -translate-x-full max-w-64 flex flex-row'>
      <div className='rounded-xl rounded-r-0 w-16 h-full bg-primaryColor p-2  flex flex-col overflow-y-auto'>
        <div className='flex-1 px-1'>
          <div className='flex justify-center align-middle w-full py-2'>
            <Link href='/'>
              <a className='flex flex-row items-center justify-center w-full h-full'>
                <Image
                  src='/images/logo-light.png'
                  width={40}
                  height={40}
                  alt='Logo'
                />
              </a>
            </Link>
          </div>
          <ul className='flex flex-col '>
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => setActiveLink(link.name)}
                  className={`flex flex-row items-center transition-all duration-200 ease-soft-in-out justify-center w-full h-full text-white my-1 py-3 px-2 ${
                    activeLink === link.name.toLowerCase()
                      ? 'bg-[rgba(255,255,255,0.2)]'
                      : ''
                  } rounded-2 `}
                >
                  <div className='flex justify-center align-middle w-full h-full'>
                    {link.icon}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {secondaryLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => setActiveLink(link.name)}
                  className={`flex flex-row items-center transition-all duration-200 ease-soft-in-out justify-center w-full h-full text-white my-1 py-3 px-2 ${
                    activeLink === link.name.toLowerCase()
                      ? 'bg-[rgba(255,255,255,0.2)]'
                      : ''
                  } rounded-2 `}
                >
                  <div className='flex justify-center align-middle w-full h-full'>
                    {link.icon}
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <div className='my-4'>
            <SeparatorLine />
          </div>
          <div className='flex flex-row items-center justify-center mb-4'>
            <div className='flex flex-row items-center justify-center w-full h-full text-white overflow-hidden'>
              <Link href='/profile'>
                <a className='flex flex-row items-center justify-center'>
                  <Image
                    src='/images/avatar.jpg'
                    width={40}
                    height={40}
                    alt='Logo'
                    className='rounded-full border-4 border-white'
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-1 bg-primaryColor-600  h-full'></div>
    </aside>
  );
};

export default Sidebar;
