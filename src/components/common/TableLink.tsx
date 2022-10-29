import Link from 'next/link';
import React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface TableLinkProps {
  url?: string;
  children?: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
}

const TableLink = (props: TableLinkProps) => {
  const { url, children, external, onClick } = props;
  return (
    <Link href={url || ''} target={external ? '_blank' : ''}>
      <a
        className='text-blue-500 hover:text-blue-600'
        onClick={() => onClick && onClick()}
      >
        {external && (
          <span className='inline-block mr-1'>
            <OpenInNewIcon className='inline-block w-4 h-4 ml-1' />
          </span>
        )}
        {children}
      </a>
    </Link>
  );
};

export default TableLink;
