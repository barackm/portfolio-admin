import { useFormikContext } from 'formik';
import React from 'react';

interface CheckboxProps {
  disabled?: boolean;
  label?: string;
  name?: string;
  usesFormik?: boolean;
  value?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const { disabled, label, name, usesFormik, value, onChange } = props;
  const { values, handleChange, handleBlur } = useFormikContext() || {
    values: {},
    handleChange: () => {},
    handleBlur: () => {},
  };

  return (
    <div className='block min-h-6 pl-7'>
      <label>
        <input
          onChange={(e) => {
            if (disabled) return;
            if (usesFormik) {
              handleChange(e);
            } else {
              onChange && onChange(e);
            }
          }}
          disabled={disabled}
          id={name}
          className={`w-5 h-5 ease-soft text-base -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-200 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-["✓"] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100 ${
            disabled ? 'cursor-default checked:after:opacity-80 opacity-80' : ''
          }`}
          type='checkbox'
        />
        {label && (
          <label
            htmlFor={name}
            className='cursor-pointer select-none text-slate-700'
          >
            {label}
          </label>
        )}
      </label>
    </div>
  );
};

export default Checkbox;
