import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

interface TableHeaderProps {
  columns: any;
  sortColumn?: {
    path: string;
    order: string;
  };
  sortTable?: boolean;
  onSort?: (sortColumn: any) => void;
}
const TableHeader = (props: TableHeaderProps) => {
  const {
    columns,
    sortColumn = { path: '', order: '' },
    onSort = () => {},
    sortTable,
  } = props;
  const raiseSort = (path: string) => {
    if (!sortTable) return;
    const sortColumnCopy: any = { ...sortColumn };
    if (sortColumnCopy.path === path)
      sortColumnCopy.order = sortColumnCopy.order === 'asc' ? 'desc' : 'asc';
    else {
      sortColumnCopy.path = path;
      sortColumnCopy.order = 'asc';
    }
    onSort(sortColumnCopy);
  };

  const renderSortIcon = (column: any) => {
    if (column.path !== sortColumn.path) return null;
    return (
      <div className='absolute right-0 flex flex-col justify-center items-center'>
        <span>
          <ArrowDropUpIcon
            className={`mb-[-0.5rem] mt-[10px] text-xs transition-all duration-300 ease-soft-in-out ${
              sortColumn.order === 'asc' ? 'text-primaryColor' : 'text-gray-400'
            }`}
          />
        </span>
        <span>
          <ArrowDropDownIcon
            className={`mt-[-0.5rem] mb-[10px] text-xs transition-all duration-300 ease-soft-in-out ${
              sortColumn.order === 'desc'
                ? 'text-primaryColor'
                : 'text-gray-400'
            }`}
          />
        </span>
      </div>
    );
  };

  return (
    <thead className='border-b'>
      <tr>
        {columns.map((column: any) => (
          <th
            key={column.path}
            className='text-xs border-b text-slate-400 font-semibold text-left py-2 px-5 uppercase'
          >
            <a
              href='#'
              onClick={() => raiseSort(column.path)}
              className='flex relative justify-center items-center'
            >
              <span className={`flex-1 ${sortTable ? 'mr-2' : ''}`}>
                {column.label}
              </span>
              {sortTable && renderSortIcon(column)}
            </a>
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.defaultProps = {
  sortColumn: { path: '', order: '' },
  sortTable: false,
};

export default TableHeader;
