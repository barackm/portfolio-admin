import React from 'react';

interface TableActionBtnProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const TableActionBtn = (props: TableActionBtnProps) => {
  const { children, className, onClick, disabled } = props;
  return (
    <button
      className={`inline-flex items-center px-2 py-1 text-xl text-slate-600 hover:text-slate-900 ${className}`}
      onClick={() => onClick && onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default TableActionBtn;
