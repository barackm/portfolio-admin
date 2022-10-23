import React from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../store/slices/ui';

const Header = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state: any) => state.entites.ui);

  return (
    <div
      className={`fixed  right-0 z-50 flex items-center justify-between h-16 px-2 transition-all duration-200 ease-soft-in-out ${
        isSidebarOpen ? 'xl:ml-72' : 'xl:ml-16'
      } left-0 top-0`}
    >
      <div className='flex justify-center px-5'>
        <div>
          <button onClick={() => dispatch(toggleSidebar())}>
            <MenuOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
