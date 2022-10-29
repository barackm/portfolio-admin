import React from 'react';
interface TagProps {
  children: React.ReactNode;
  className?: string;
}

const Tag = (props: TagProps) => {
  const { children, className } = props;
  return (
    <div
      className={`inline-block px-2 py-1 rounded-md text-xs font-medium bg-slate-200 text-slate-700 ${className}`}
    >
      {children}
    </div>
  );
};

export default Tag;
