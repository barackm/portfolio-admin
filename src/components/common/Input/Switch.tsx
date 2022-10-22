import { useFormikContext } from 'formik';
import React from 'react';

interface SwitchProps {
  disabled?: boolean;
  label?: string;
  name?: string;
  usesFormik?: boolean;
  value?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch = (props: SwitchProps) => {
  const { disabled, label, name, usesFormik, value, onChange } = props;
  const { values, handleChange, handleBlur } = useFormikContext() || {
    values: {},
    handleChange: () => {},
    handleBlur: () => {},
  };

  return (
    <div className='min-h-6 mb-0.5 flex items-center'>
      <input
        id={name}
        className={`rounded-10 duration-300 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-300 checked:after:translate-x-5 h-5 mt-0.5 relative float-left w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-primaryColor-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-primaryColor/95 checked:bg-none checked:bg-right`}
        type='checkbox'
        name={name}
        disabled={disabled}
        checked={
          usesFormik && values ? values[name as keyof typeof values] : value
        }
        onChange={(e) => {
          if (usesFormik) {
            handleChange(e);
          } else {
            onChange && onChange(e);
          }
        }}
      />
      <label
        htmlFor={name}
        className={`inline-block pl-3 mb-0 ml-0 font-normal cursor-pointer select-none text-sm text-primaryColor`}
      >
        {label}
      </label>
    </div>
  );
};

Switch.defaultProps = {
  disabled: false,
  label: 'Remember me',
  name: 'remember',
  usesFormik: false,
};

export default Switch;
