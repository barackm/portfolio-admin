import React, { useEffect, useRef } from 'react';
import Button from '../Button';
import { readFromQueryString } from '../../../utlis/queryParams';
import useSearch from '../../../hooks/useSearch';
import { updateSearch } from '../../../utlis/constants/browserHistory';
import useSyncWithSearch from '../../../hooks/useSyncWithSearch';
import Link from 'next/link';

interface DefaultTableHeaderInfoProps {
  title?: string;
  subTitle?: string;
  pageSizeQueryField: string;
  routePathToNew?: string;
}

const DefaultTableHeaderInfo = (props: DefaultTableHeaderInfoProps) => {
  const { title, subTitle, pageSizeQueryField, routePathToNew } = props;
  const search = useSearch();
  const pageSize = Number(
    readFromQueryString(search, pageSizeQueryField) ?? '10',
  );

  const [pageSizeSearch, setPageSizeSearch] = useSyncWithSearch(
    pageSizeQueryField,
    String(pageSize),
    !search,
  );

  const searchRef = useRef(search);

  const setPageSize = (pageSizeNumber: number) =>
    // @ts-ignore
    setPageSizeSearch(String(pageSizeNumber));

  useEffect(() => {
    setTimeout(() => {
      if (!readFromQueryString(searchRef.current, pageSizeQueryField)) {
        updateSearch({
          [pageSizeQueryField]: String(pageSize),
        });
      }
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='px-4 py-6'>
      <div className='flex flex-col'>
        <div className='flex'>
          <div className='flex-1'>
            <span className='text-3xl font-normal text-slate-800'>{title}</span>
            <p className='text-slate-400 font-light text-[1rem]'>{subTitle}</p>
          </div>
          {routePathToNew && (
            <div className=''>
              <Button className='mr-1 shadow-none' onClick={() => {}}>
                <Link href={routePathToNew || '/'}>
                  <span className='text-xs'>+ Add new</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
        <div className='py-5 flex items-center w-full'>
          <div className='dataTable-dropdown'>
            <label className='text-slate-400 font-light text-sx'>
              <select
                className='dataTable-selector text-sm'
                name='limit'
                value={pageSizeSearch.toString() || '10'}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option value='2' className=''>
                  2
                </option>
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
