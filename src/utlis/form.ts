import { StylesConfig } from 'react-select';

export const getDefaultSelectInputStyles = ({ inpurError, error }: any) => {
  const defaultSelectStyles: StylesConfig<any, false> = {
    control: (provided: any) => ({
      ...provided,
      border: inpurError || error ? '1px solid #ed4a4a' : '1px solid #ccccc',
      borderRadius: '0.5rem',
      boxShadow: 'none',
      cursor: 'pointer',
      '&:focus-within': {
        boxShadow:
          inpurError || error ? '0 0 0 2px #ed4a4a' : '0 0 0 2px #0e1630',
        borderColor: '#0e1630',
      },
    }),

    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#20326F' : '#fff',
      fontSize: '0.9rem',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: state.isSelected ? '#20326F' : 'rgb(23 36 79 / 33%)',
        color: state.isSelected ? '#fff' : '#20326F',
      },
    }),

    singleValue: (provided: any) => ({
      ...provided,
      fontSize: '0.9rem',
    }),

    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgb(23 36 79 / 33%)',
      color: '#20326F',
      fontSize: '0.9rem',
      borderRadius: '0.4rem',
      cursor: 'pointer',
      overflow: 'hidden',
      '&:hover': {
        backgroundColor: 'rgb(23 36 79 / 33%)',
        color: '#20326F',
      },
    }),
  };

  return defaultSelectStyles;
};
