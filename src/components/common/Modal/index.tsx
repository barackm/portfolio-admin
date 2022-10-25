import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../Button';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  title?: string | React.ReactNode;
  onClose: () => void;
  className?: string;
}

const Modal = (props: ModalProps) => {
  const { children, open, title, onClose, className = '' } = props;
  const mainModalParentRef = React.useRef<HTMLDivElement>(null);
  const modalContentRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {};

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full overflow-x-hidden  transition-opacity ease-linear z-sticky outline-0 backdrop-saturate-200 backdrop-blur-[2px] bg-slate-700/70 dark:bg-gray-950/80  ${
        open
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } bord`}
      id='import'
      ref={mainModalParentRef}
      onMouseOver={() => {
        console.log('mouse over');
      }}
    >
      <div
        className='relative m-2 flex justify-center transition-transform duration-300 sm:m-7 sm:mx-auto h-full ease-soft-out'
        ref={modalContentRef}
      >
        <div
          className={`relative min-w-140 max-w-[90%] w-[90%] sm:w-[600px] lg:mt-8 flex h-auto max-h-[80%] flex-col bg-white border border-solid dark:bg-gray-950 bg-clip-padding border-black/20 rounded-xl outline-0 ${className}`}
        >
          <div className='flex items-center justify-between p-4 border-b border-solid shrink-0 border-slate-100 rounded-t-xl sticky top-0 left-0 bg-white'>
            <h5 className='mb-0 leading-normal text-slate-700' id='ModalLabel'>
              {typeof title === 'string' ? title : title}
            </h5>

            <button
              type='button'
              onClick={onClose}
              className='w-4 h-4 transition-all ease-linear ml-auto box-content p-2 text-black border-0 rounded-1.5 opacity-50 cursor-pointer flex justify-center items-center hover:opacity-100 focus:outline-none'
            >
              <CloseIcon />
            </button>
          </div>
          <div className='relative h-full flex-auto p-4 overflow-x-hidden overflow-y-auto'>
            {children}
          </div>
          <div className='flex flex-wrap items-center justify-end p-3 border-t border-solid shrink-0 border-slate-100 rounded-b-xl sticky bottom-0 left-0'>
            <Button>
              <span className='text-xs'>Confirm</span>
            </Button>
            <Button className='ml-2' color='secondary'>
              <span className='text-xs'>Cancel</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
