import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  color?:
    | 'primary'
    | 'secondary'
    | 'default'
    | 'inherit'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  onClick: () => void;
  widthAuto?: boolean;
}

const Button = (props: ButtonProps) => {
  const { children, variant, disabled, onClick, color, widthAuto } = props;
  const getBtnClasses = () => {
    const defaultBtnClasses = `inline-block px-6 py-3 mr-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-fuchsia-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs`;
    const outlinedBtnClasses = `uppercase align-middle transition-all bg-transparent border rounded-lg cursor-pointer border-fuchsia-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs text-fuchsia-500`;
    // const disabledBtnClasses = `opacity-50 cursor-default bg-${color} active:opacity-50 text-white hover:transform-none ${
    //   variant === 'outlined'
    //     ? `border-${color} hover:bg-transparent hover:text-${color}`
    //     : ''
    // }`;
    const textBtnClasses = `inline-block px-6 py-3 mr-3 font-bold text-center uppercase align-middle transition-all rounded-lg cursor-pointer bg-fuchsia-500/0 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-fuchsia-500/25 hover:scale-102 active:bg-fuchsia/45 text-fuchsia-500`;
    const btnClasses = `${defaultBtnClasses} ${
      variant === 'outlined' ? outlinedBtnClasses : ''
    } ${variant === 'text' ? textBtnClasses : ''}`;

    return btnClasses;
  };

  return (
    <button
      className={`${getBtnClasses()} ${widthAuto ? 'w-auto' : ''}`}
      onClick={() => (disabled ? null : onClick())}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  variant: 'contained',
  disabled: false,
  color: 'secondary',
};

export default Button;
