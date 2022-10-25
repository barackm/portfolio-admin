import { useFormikContext } from 'formik';
import React from 'react';
import LoadingIndicator from '../LoadingIndicator';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  color?: 'primary' | 'secondary';

  onClick?: () => void;
  widthAuto?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  usesFormik?: boolean;
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    variant,
    disabled,
    onClick,
    className,
    widthAuto,
    type,
    usesFormik,
    loading,
    color,
  } = props;
  const { handleSubmit } = useFormikContext() || {};
  const getBtnClasses = () => {
    const defaultBtnClasses = `inline-block px-6 py-2  font-bold text-center text-white uppercase border ${
      color === 'primary' ? 'border-primaryColor' : 'border-secondaryColor'
    } align-middle transition-all rounded-lg cursor-pointer ${
      color === 'primary' ? `bg-primaryColor` : `bg-secondaryColor`
    } leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs`;
    const outlinedBtnClasses = `uppercase align-middle transition-all bg-transparent border rounded-lg cursor-pointer ${
      color === 'primary'
        ? 'border-primaryColor '
        : 'border-secondaryColor text-secondaryColor'
    } leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs text-primaryColor`;
    const textBtnClasses = `inline-block px-6 py-2.5 font-bold text-center uppercase align-middle transition-all rounded-lg cursor-pointer bg-transparent shadow-none border-none leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 ${
      color === 'primary'
        ? 'hover:bg-primaryColor/25 text-primaryColor'
        : 'hover:bg-secondaryColor/25 text-secondaryColor'
    } hover:scale-102 ${
      color === 'primary'
        ? 'active:bg-primaryColor/45 '
        : 'active:bg-secondaryColor/45 '
    }`;
    const btnClasses = `${defaultBtnClasses} ${
      variant === 'outlined' ? outlinedBtnClasses : ''
    } ${variant === 'text' ? textBtnClasses : ''}`;
    return btnClasses;
  };

  return (
    <button
      className={`${getBtnClasses()} ${widthAuto ? 'w-auto' : ''} ${
        className ? className : ''
      } relative `}
      onClick={() => {
        if (disabled || loading) return;

        if (usesFormik) {
          if (disabled) return;
          handleSubmit();
        } else {
          disabled ? null : onClick && onClick();
        }
      }}
      type={type}
      title='button'
    >
      {loading && (
        <div className='absolute text-center flex w-full left-0 right-0 top-0 bottom-0  justify-center items-center z-20'>
          <LoadingIndicator width={25} strokeWidth={5} />
        </div>
      )}
      <span className={`${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>
    </button>
  );
};

Button.defaultProps = {
  variant: 'contained',
  disabled: false,
  color: 'primary',
  type: 'button',
};

export default Button;
