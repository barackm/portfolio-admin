import React, { useEffect, useRef } from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { toggleSidebar } from '../../store/slices/ui';
import { useAppDispatch } from '../../hooks/store';
import { useRouter } from 'next/router';
import { links, secondaryLinks } from '../Sidebar/data';
import Link from 'next/link';
import routes from '../../utlis/routes';
import { getBreadcrumb } from '../../utlis/routing';

const Header = () => {
  const dispatch = useAppDispatch();
  const headerRef: any = useRef(null);
  const { isSidebarOpen } = useSelector((state: any) => state.entities.ui);
  const [scrolling, setScrolling] = React.useState(false);
  const [breadcrumb, setBreadcrumb] = React.useState<any>({
    paths: [],
    title: '',
    description: '',
  });

  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 0) {
          setScrolling(true);
        } else {
          setScrolling(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fullPath = router.asPath;
    const breadcrumb: any = getBreadcrumb(fullPath, [
      ...links,
      ...secondaryLinks,
    ]);
    setBreadcrumb(breadcrumb);
  }, [router.asPath]);

  return (
    <nav
      className={`fixed   z-50 flex items-center justify-between h-16 px-1 transition-all duration-300 ease-soft-in-out ${
        isSidebarOpen ? 'xl:ml-72' : 'xl:ml-16'
      } left-6 right-6  rounded-xl z-110 ${
        scrolling
          ? 'top-2 backdrop-saturate-200 backdrop-blur-[5px] bg-white/90 dark:bg-gray-950/80 shadow-blur dark:shadow-dark-blur'
          : 'top-4'
      }`}
      ref={headerRef}
    >
      <div className='flex justify-between w-full px-3 items-center'>
        <div className='flex items-center'>
          <div className='flex flex-col mr-10'>
            <div className='flex'>
              <Link href={routes.dashboard}>
                <a className='text-gray-600'>
                  <HomeIcon />
                </a>
              </Link>
              {breadcrumb.paths.length > 0 ? (
                <span className='mx-2 text-gray-600 font-light'>/</span>
              ) : (
                ''
              )}
              {breadcrumb.paths.map((item: any, index: number) =>
                item.isCurrent ? (
                  <span
                    key={index}
                    className='text-gray-800 font-normal text-sm'
                  >
                    {item.description}
                  </span>
                ) : (
                  <div key={index}>
                    <Link href={item.path}>
                      <a className='text-gray-600 font-normal text-sm'>
                        {item.name}
                      </a>
                    </Link>
                    <span className='mx-2 text-gray-600 font-light'>/</span>
                  </div>
                ),
              )}
            </div>
            <div className='flex'>
              <span className='font-normal'>{breadcrumb.description}</span>
            </div>
          </div>
          <div>
            <button
              onClick={() => dispatch(toggleSidebar())}
              title='actionButton'
            >
              <MenuOutlinedIcon />
            </button>
          </div>
        </div>
        <div>
          <button
            type='button'
            title='logout'
            className='flex items-center justify-center p-2 hover:bg-gray-200 rounded-full'
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
