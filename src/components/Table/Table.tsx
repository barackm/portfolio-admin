import React from 'react';
import LoadingIndicator from '../common/LoadingIndicator';
import AppPagination from '../common/Pagination';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

interface TableProps {
  columns: any;
  sortColumn?: {
    path: string;
    order: string;
  };
  sortTable?: boolean;
  onSort?: (sortColumn: any) => void;
  data: any;
  loading?: boolean;
  title?: string;
  topHeaderContent?: JSX.Element;
  limit?: number;
  total?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  count?: number;
  pageNumberQueryField?: string;
  pageSizeQueryField?: string;
}

const Table = (props: TableProps) => {
  const {
    columns,
    sortColumn,
    onSort,
    data,
    sortTable,
    loading,
    title,
    topHeaderContent,
    page,
    onPageChange,
    pageSizeQueryField,
    total,
    pageNumberQueryField,
  } = props;
  return (
    <div className='w-full max-w-full'>
      <div className='relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border overflow-hidden'>
        {topHeaderContent ? (
          topHeaderContent
        ) : (
          <div className='px-4 py-6'>
            <span className='text-slate-800 text-xl'>{title}</span>
          </div>
        )}
        <div className='table-responsive overflow-x-auto'>
          <table className='table w-full'>
            <TableHeader
              columns={columns}
              sortColumn={sortColumn}
              sortTable={sortTable}
              onSort={onSort}
            />
            <TableBody data={data} columns={columns} />
          </table>
        </div>
        {loading && (
          <div className='absolute w-full h-full min-h-10 top-0 bottom-0 left-0 right-0 flex justify-center items-center backdrop-saturate-100 backdrop-blur-[2px] bg-white/10 dark:bg-gray-950/80 shadow-blur dark:shadow-dark-blur z-10'>
            <LoadingIndicator />
          </div>
        )}
        <div className='p-4 flex justify-center items-center'>
          <AppPagination
            pageNumberQueryField={pageNumberQueryField || 'page'}
            total={total || 0}
            pageSizeQueryField={pageSizeQueryField || 'limit'}
          />
        </div>
      </div>
    </div>
  );
};

Table.defaultProps = {
  sortTable: true,
  loading: false,
  title: 'Table Data',
};

export default Table;
