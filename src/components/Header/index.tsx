import React, { useEffect, useRef } from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../store/slices/ui';
import { useAppDispatch } from '../../hooks/store';

const Header = () => {
  const dispatch = useAppDispatch();
  const headerRef: any = useRef(null);
  const { isSidebarOpen } = useSelector((state: any) => state.entities.ui);
  const [scrolling, setScrolling] = React.useState(false);

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

  return (
    <nav
      className={`fixed   z-50 flex items-center justify-between h-16 px-2 transition-all duration-300 ease-soft-in-out ${
        isSidebarOpen ? 'xl:ml-72' : 'xl:ml-16'
      } left-6 right-6  rounded-xl z-110 ${
        scrolling
          ? 'top-2 backdrop-saturate-200 backdrop-blur-[5px] bg-white/90 dark:bg-gray-950/80 shadow-blur dark:shadow-dark-blur'
          : 'top-2'
      }`}
      ref={headerRef}
    >
      <div className='flex justify-center px-5'>
        <div>
          <button
            onClick={() => dispatch(toggleSidebar())}
            title='actionButton'
          >
            <MenuOutlinedIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
