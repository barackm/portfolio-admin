import React from 'react';
import { useFormikContext } from 'formik';

interface TextInputProps {
  widthAuto?: boolean;
  name?: string;
  id?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  usesFormik?: boolean;
  error?: string;
  showErrorText?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const TextInput = (props: TextInputProps) => {
  const {
    widthAuto,
    name,
    id,
    type,
    placeholder,
    value,
    label,
    disabled,
    error,
    showErrorText,
    usesFormik,
    onChange = () => {},
    startIcon,
    endIcon,
  } = props;
  const { values, handleChange, setFieldTouched, errors, touched } =
    useFormikContext() || {};

  const inpurError =
    touched &&
    touched[name as keyof typeof errors] &&
    errors &&
    errors[name as keyof typeof errors];

  const getTextInputClasses = () => {
    const defaultStyles = `${startIcon ? 'pl-9' : 'pl-3'} text-sm ${
      error || inpurError
        ? 'focus:shadow-soft-primary-error-outline'
        : 'focus:shadow-soft-primary-outline'
    } ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-1.5 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-primaryColor-300 focus:outline-none focus:transition-shadow    ${
      endIcon ? 'pr-9' : 'pr-3'
    } ${widthAuto ? 'w-auto' : ''}`;

    const errorStyles = `border-red-500 text-red-500 placeholder-red-500 focus:border-red-500 focus:shadow-soft-error-outline`;
    const disabledStyles = `opacity-50 cursor-default bg-gray-100 active:opacity-50 text-gray-500 hover:transform-none`;

    return `${defaultStyles} ${error || inpurError ? errorStyles : ''} ${
      disabled ? disabledStyles : ''
    }`;
  };

  return (
    <div className='relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft'>
      {label && (
        <label
          htmlFor={name}
          className='block text-md mb-1 font-medium text-gray-700'
        >
          {label}
        </label>
      )}
      <div className='relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft'>
        {startIcon && (
          <span
            className={`text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal ${
              error || inpurError ? 'text-red-600' : 'text-slate-500'
            } transition-all`}
          >
            {startIcon}
          </span>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={
            usesFormik && values ? values[name as keyof typeof values] : value
          }
          onChange={(e) => {
            if (usesFormik) {
              handleChange(e);
            } else {
              onChange(e);
            }
          }}
          disabled={disabled}
          placeholder={placeholder}
          onBlur={() => {
            if (usesFormik && setFieldTouched) {
              setFieldTouched(name as keyof typeof values);
            }
          }}
          className={getTextInputClasses()}
        />
        {endIcon && (
          <span className='text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all right-0'>
            {endIcon}
          </span>
        )}
      </div>
      {(inpurError || error) && (
        <p className='text-sm text-red-600 mb-0' id='email-error'>
          {inpurError || error}
        </p>
      )}
    </div>
  );
};

TextInput.defaultProps = {
  widthAuto: true,
  name: 'text-input',
  id: 'text-input',
  type: 'text',
  placeholder: 'Enter text',
  value: '',
  label: '',
  onChange: () => {},
  disabled: false,
  usesFormik: true,
};

export default TextInput;
