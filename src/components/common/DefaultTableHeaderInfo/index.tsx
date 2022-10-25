import React from 'react';
import Button from '../Button';
import SearchIcon from '@mui/icons-material/Search';
import TextInput from '../Input/TextInput';

interface DefaultTableHeaderInfoProps {
  title?: string;
  subTitle?: string;
}

const DefaultTableHeaderInfo = (props: DefaultTableHeaderInfoProps) => {
  const { title, subTitle } = props;

  return (
    <div className='px-4 py-6'>
      <div className='flex flex-col'>
        <div className='flex'>
          <div className='flex-1'>
            <span className='text-2xl font-normal text-slate-800'>{title}</span>
            <p className='text-slate-400 font-light text-[0.9rem]'>
              {subTitle}
            </p>
          </div>
          <div className=''>
            <Button className='mr-1'>
              <span className='text-xs'>+ Add new</span>
            </Button>
            <Button variant='outlined' className=' mr-1'>
              <span className='text-xs'>Import</span>
            </Button>
            <Button variant='outlined'>
              <span className='text-xs'>Export</span>
            </Button>
          </div>
        </div>
        <div className='py-5 flex items-center w-full'>
          <div className='dataTable-dropdown'>
            <label className='text-slate-400 font-light text-sx'>
              <select className='dataTable-selector text-sm'>
                <option value='5' className=''>
                  5
                </option>
                <option value='10'>10</option>
                <option value='15'>15</option>
                <option value='20'>20</option>
                <option value='25'>25</option>
              </select>{' '}
              <span className=' text-sm capitalize ml-1'>entries per page</span>
            </label>
          </div>
          <div className='flex-1 flex items-center justify-end '>
            <div className='w-56'>
              <TextInput
                usesFormik={false}
                placeholder='Search...'
                startIcon={<SearchIcon />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DefaultTableHeaderInfo.defaultProps = {
  title: 'Table Data',
  subTitle: 'Manage your table data here with ease',
};

export default DefaultTableHeaderInfo;
