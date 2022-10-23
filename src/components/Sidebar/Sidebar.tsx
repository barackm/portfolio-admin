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
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const links = [
  {
    id: 1,
    name: 'Dashboard',
    link: '/',
    icon: <HomeOutlinedIcon />,
    children: [
      {
        id: 1,
        name: 'Dashboard',
        link: '/',
        icon: <HomeOutlinedIcon />,
      },
    ],
  },
  {
    id: 2,
    name: 'Admin',
    link: '/admin',
    children: [
      {
        id: 1,
        name: 'Dashboard',
        link: '/admin',
        icon: <AdminPanelSettingsOutlinedIcon />,
      },
    ],
    icon: <AdminPanelSettingsOutlinedIcon />,
  },
  {
    id: 3,
    name: 'Projects',
    link: '/projects',
    children: [
      {
        id: 1,
        name: 'Projects',
        link: '/projects',
        icon: <ListAltOutlinedIcon />,
      },
      {
        id: 2,
        name: 'New',
        link: '/projects/new',
        icon: <AddBoxOutlinedIcon />,
      },
    ],
    icon: <ListAltOutlinedIcon />,
  },
  {
    id: 4,
    name: 'Blog',
    link: '/blog',
    children: [
      {
        id: 1,
        name: 'Blog',
        link: '/blog',
        icon: <BookOutlinedIcon />,
      },
      {
        id: 2,
        name: 'New',
        link: '/blog/new',
        icon: <AddBoxOutlinedIcon />,
      },
      {
        id: 3,
        name: 'Drafts',
        link: '/blog/drafts',
        icon: <SaveAsOutlinedIcon />,
      },
      {
        id: 4,
        name: 'Scheduled',
        link: '/blog/scheduled',
        icon: <PendingActionsOutlinedIcon />,
      },
    ],
    icon: <BookOutlinedIcon />,
  },
  {
    id: 5,
    name: 'Users',
    link: '/users',
    children: [
      {
        id: 1,
        name: 'Users',
        link: '/users',
        icon: <PeopleAltOutlinedIcon />,
      },
      {
        id: 2,
        name: 'New',
        link: '/users/new',
        icon: <PersonAddAltOutlinedIcon />,
      },
    ],
    icon: <PeopleAltOutlinedIcon />,
  },
];

const Sidebar = () => {
  const [activeLink, setActiveLink] = React.useState(links[0]);
  const [activeChildLink, setActiveChildLink] = React.useState(
    links[0].children[0],
  );
  const secondaryLinks = [
    {
      id: 1,
      name: 'Settings',
      link: '/settings',
      icon: <SettingsOutlinedIcon />,
      children: [
        {
          id: 1,
          name: 'Settings',
          link: '/settings',
          icon: <SettingsOutlinedIcon />,
        },
      ],
    },
  ];

  return (
    <aside className='fixed inset-y-0 left-0 flex-wrap items-center justify-between w-full p-0  transition-all duration-200  border-0 dark:bg-gray-950 ease-soft-in-out z-990  xl:translate-x-0 xl:bg-transparent -translate-x-full max-w-72 flex flex-row'>
      <div className='rounded-r-0 w-16 h-full bg-primaryColor p-2  flex flex-col overflow-y-auto'>
        <div className='flex-1 px-1'>
          <div className='flex justify-center align-middle w-full py-2 mb-3'>
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
                  onClick={() => setActiveLink(link)}
                  className={`flex flex-row items-center transition-all duration-200 ease-soft-in-out justify-center w-full h-full my-1 py-3 px-2 ${
                    activeLink.name === link.name
                      ? 'bg-[rgba(255,255,255,0.2)]'
                      : ''
                  } rounded-2 hover:bg-[rgba(255,255,255,0.2)]`}
                >
                  <div
                    className={`flex justify-center align-middle w-full h-full  ${
                      activeLink.name === link.name
                        ? 'text-white'
                        : 'text-slate-400'
                    }`}
                  >
                    {link.icon}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {secondaryLinks.map((link: any) => (
              <li key={link.id}>
                <button
                  onClick={() => setActiveLink(link)}
                  className={`flex flex-row items-center transition-all duration-200 ease-soft-in-out justify-center w-full h-full my-1 py-3 px-2 ${
                    activeLink.name === link.name
                      ? 'bg-[rgba(255,255,255,0.2)] text-white'
                      : 'text-slate-400'
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
      <div className='flex flex-1 bg-primaryColor-600  h-full  w-full'>
        <div className='p-3 flex flex-col  w-full'>
          <div className='flex-1  w-full'>
            <div className='flex flex-row items-center justify-between mb-4 h-10 text-slate-200 w-full'>
              <span className='text-md'>{activeLink.name}</span>
            </div>
            <ul>
              {activeLink.children.map((link) => (
                <li key={link.id}>
                  <Link href={link.link}>
                    <a
                      className={`flex flex-row w-full align-middle h-full transition-all duration-200 ease-soft-in-out ${
                        activeChildLink.id === link.id
                          ? 'text-white'
                          : 'text-slate-400'
                      } my-1 py-2 px-2 rounded-1 hover:bg-[rgba(255,255,255,0.2)] ${
                        activeChildLink.id === link.id
                          ? 'bg-[rgba(255,255,255,0.2)]'
                          : ''
                      }`}
                      onClick={() => setActiveChildLink(link)}
                    >
                      <div className='flex align-middle w-full h-full'>
                        <div className='mr-2 flex justify-center align-middle'>
                          {link.icon}
                        </div>
                        {link.name}
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <SeparatorLine />
          <div className='flex align-middle justify-center pb-1'>
            <div className='flex flex-1 text-slate-200 flex-col text-sm'>
              <p className='mb-0'>Barack Mukelenga</p>
              <span className=' text-slate-400 mt-0'>admin</span>
            </div>
            <div className='flex justify-center align-middle text-slate-200 '>
              <button className='flex justify-center align-middle text-slate-200 tex-center p-2 pt-3'>
                <LogoutOutlinedIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
