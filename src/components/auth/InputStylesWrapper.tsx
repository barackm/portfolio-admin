import React from 'react';

interface InputStylesWrapperProps {
  children: React.ReactNode;
  className?: string;
}
const InputStylesWrapper = (props: InputStylesWrapperProps) => {
  const { children, className } = props;
  return (
    <div
      className={`flex flex-col justify-center align-middle w-full mb-2 ${
        className || ''
      }`}
    >
      {children}
    </div>
  );
};

export default InputStylesWrapper;
