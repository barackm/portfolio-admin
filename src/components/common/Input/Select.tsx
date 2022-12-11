import React from 'react';
import Creatable from 'react-select/creatable';
import ReactSelect, { StylesConfig } from 'react-select';
import { useFormikContext } from 'formik';
import { getDefaultSelectInputStyles } from '../../../utlis/form';

interface SelectProps {
  name?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  onChange?: any;
  disabled?: boolean;
  usesFormik?: boolean;
  error?: string;
  showErrorText?: boolean;
  isMulti?: true;
  isCreatable?: boolean;
  options?: any;
}

const Select = (props: SelectProps) => {
  const {
    name,
    id,
    placeholder,
    value,
    label,
    disabled,
    error,
    showErrorText,
    usesFormik,
    isCreatable,
    isMulti,
    options,
    onChange = (e: any) => {},
  } = props;
  const { values, setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext<{
      [key: string]: any;
    }>() || {};

  const inpurError: any =
    touched &&
    touched[name as keyof typeof errors] &&
    errors &&
    errors[name as keyof typeof errors];

  return (
    <div>
      {label && (
        <label className='block text-md mb-1 font-[400] text-gray-700'>
          {label}
        </label>
      )}
      {isCreatable ? (
        <Creatable
          options={options}
          // @ts-ignore
          isMulti={isMulti}
          id={id}
          styles={getDefaultSelectInputStyles({
            inpurError,
            error,
          })}
          onBlur={() => usesFormik && setFieldTouched(name as string)}
          onChange={(value) => {
            if (disabled) return;
            if (usesFormik) {
              setFieldValue(name as string, value);
            }
            onChange({
              target: {
                name: name as string,
                value,
              },
            });
          }}
          value={usesFormik ? values[name as string] : value}
          placeholder={placeholder}
        />
      ) : (
        <ReactSelect
          options={options}
          // @ts-ignore
          isMulti={isMulti}
          id={id}
          styles={getDefaultSelectInputStyles({
            inpurError,
            error,
          })}
          onBlur={() => setFieldTouched(name as string)}
          onChange={(value) => {
            if (disabled) return;
            if (usesFormik) {
              setFieldValue(name as string, value);
            }
            onChange({
              target: {
                name: name as string,
                value,
              },
            });
          }}
          value={usesFormik ? values[name as string] : value}
          placeholder={placeholder}
        />
      )}
      {(inpurError || error) && (
        <p className='text-sm text-red-600 mb-0' id='email-error'>
          {inpurError || error}
        </p>
      )}
    </div>
  );
};

Select.defaultProps = {
  usesFormik: true,
  isCreatable: false,
  isMulti: false,
  showErrorText: true,
  options: [],
};

export default Select;
