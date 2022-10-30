import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

import SeparatorLine from '../common/SeparatorLine';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { links, secondaryLinks } from './data';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { logoutUser } from '../../services/authService';
import { useRouter } from 'next/router';
import { setSidebar } from '../../store/slices/ui';
import {
  getCurrentActiveLink,
  isCurrentRouteActive,
} from '../../utlis/routing';

const Sidebar = () => {
  const [sidebarOnHover, setSidebarOnHover] = React.useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentUser }: any = useAppSelector((state) => state.auth);
  const [activeLink, setActiveLink] = React.useState<any>({ children: [] });
  const sidebarRef: {
    current: HTMLDivElement | null;
  } = React.useRef(null);

  const isStillHovering = () => {
    if (sidebarRef.current) {
      const isHovering = sidebarRef.current.matches(':hover');
      if (isHovering) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleLogoutUser = () => {
    dispatch(logoutUser(router));
  };

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.addEventListener('mouseenter', () => {
        setTimeout(() => {
          if (isStillHovering()) {
            setSidebarOnHover(true);
          }
        }, 500);
      });
    }
    if (sidebarRef.current) {
      sidebarRef.current.addEventListener('mouseleave', () => {
        setTimeout(() => {
          setSidebarOnHover(false);
        }, 500);
      });
    }
  }, []);

  useEffect(() => {
    const { parent, child } = getCurrentActiveLink(router.asPath, [
      ...links,
      ...secondaryLinks,
    ]);
    setActiveLink(parent || links[0]);
  }, [router.asPath]);

  const { isSidebarOpen } = useSelector((state: any) => state.entities.ui);
  const { firstName, lastName, email } = currentUser;

  return (
    <aside
      className={`fixed inset-y-0 left-0 flex-wrap items-center justify-between w-full p-0  transition-all duration-300  bg-gray-950 ease-soft-in-out z-990  xl:translate-x-0 xl:bg-transparent -translate-x-full flex flex-row ${
        isSidebarOpen
          ? 'max-w-72'
          : `${sidebarOnHover ? 'max-w-72' : 'max-w-16'}`
      }`}
      ref={sidebarRef}
    >
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
                <Link href={link.link}>
                  <a
                    onClick={() => {
                      setActiveLink(link);
                      if (!isSidebarOpen) {
                        dispatch(setSidebar(true));
                      }
                    }}
                    className={`flex flex-row items-center cursor-pointer transition-all duration-200 ease-soft-in-out justify-center w-full h-full my-1 py-3 px-2 ${
                      isCurrentRouteActive(router.asPath, link.link, {
                        isParent: true,
                      })
                        ? 'bg-[rgba(255,255,255,0.2)] text-white'
                        : 'text-slate-400'
                    } rounded-2 flex justify-center align-middle w-full h-full  ${
                      isCurrentRouteActive(router.asPath, link.link, {
                        isParent: true,
                      })
                        ? 'text-white'
                        : 'text-slate-400'
                    }`}
                  >
                    {link.icon}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {secondaryLinks.map((link: any) => (
              <li key={link.id}>
                <Link href={link.link}>
                  <a
                    className={`flex flex-row items-center cursor-pointer transition-all duration-200 ease-soft-in-out justify-center w-full h-full my-1 py-3 px-2 ${
                      isCurrentRouteActive(router.asPath, link.link, {
                        isParent: true,
                      })
                        ? 'bg-[rgba(255,255,255,0.2)] text-white'
                        : 'text-slate-400'
                    } rounded-2 flex justify-center align-middle w-full h-full  ${
                      isCurrentRouteActive(router.asPath, link.link, {
                        isParent: true,
                      })
                        ? 'text-white'
                        : 'text-slate-400'
                    }`}
                  >
                    {link.icon}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div className='my-4'>
            <SeparatorLine />
          </div>
          <div className='flex flex-row items-center justify-center mb-4'>
            <div className='flex flex-row items-center justify-center w-full h-full text-white overflow-hidden'>
              <Link href='/profile'>
                <a className='flex rounded-full overflow-hidden flex-row items-center justify-center  border-2 border-white'>
                  <Image
                    src='/images/avatar.jpg'
                    width={35}
                    height={35}
                    alt='Logo'
                    className=''
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex  w-56 flex-1 bg-primaryColor-600  h-full transition-all duration-300 ease-soft-in-out  overflow-y-auto`}
      >
        <div
          className={`p-3 flex flex-col  w-full transition-all ease-soft-in-out duration-300 delay-300 ${
            !isSidebarOpen && !sidebarOnHover ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className='flex-1 w-full'>
            <div className='flex flex-row items-center justify-between mb-4 h-10 text-slate-200 w-full'>
              <span className='text-md'>{activeLink.name}</span>
            </div>
            <ul>
              {activeLink.children.map((link: any) => (
                <li key={link.id}>
                  <Link href={link.link} as={link.paramName ? link.link : ''}>
                    <a
                      className={`flex flex-row w-full align-middle h-full transition-all duration-200 ease-soft-in-out ${
                        isCurrentRouteActive(router.asPath, link.link, {
                          isParent: false,
                          router,
                        })
                          ? 'text-white'
                          : 'text-slate-400'
                      } my-1 py-2 px-2 rounded-1 hover:bg-[rgba(255,255,255,0.2)] ${
                        isCurrentRouteActive(router.asPath, link.link, {
                          isParent: false,
                          router,
                        })
                          ? 'bg-[rgba(255,255,255,0.2)]'
                          : ''
                      }`}
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
          <div className='flex align-middle justify-center pb-1 w-full'>
            <div className='flex w-[80%] text-slate-200 flex-col text-sm'>
              <p className='mb-0 capitalize w-full overflow-hidden whitespace-nowrap text-ellipsis'>{`${firstName} ${lastName}`}</p>
              <span className=' text-slate-400 mt-0 w-full overflow-hidden whitespace-nowrap text-ellipsis text-sm'>
                {email}
              </span>
            </div>
            <div className='flex w-[20%] justify-center items-center text-slate-200 '>
              <button
                onClick={handleLogoutUser}
                className='flex justify-center items-center text-slate-200 tex-center p-2'
                title='Logout'
              >
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
