import React from 'react';

interface TableBodyProps {
  data: [];
  columns: [];
}

const TableBody = (props: TableBodyProps) => {
  const { data, columns } = props;

  return (
    <tbody>
      {data.map((item: any) => (
        <tr key={item._id}>
          {columns.map((column: any) => (
            <td
              key={column.path}
              className='font-light leading-normal text-sm px-4 py-3 border-b border-gray-200 text-slate-600'
            >
              {column.content ? column.content(item) : item[column.path]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
