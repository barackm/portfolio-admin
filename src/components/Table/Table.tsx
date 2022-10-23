import React from 'react';
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
}

const Table = (props: TableProps) => {
  const { columns, sortColumn, onSort, data, sortTable } = props;
  return (
    <div className='w-full max-w-full'>
      <div className='relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border'>
        <div className='table-responsive mt-20 pb-5 overflow-x-auto'>
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
      </div>
    </div>
  );
};

export default Table;
