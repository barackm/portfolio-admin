import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface AppPaginationProps {
  count: number;
  variant?: 'text' | 'outlined' | 'contained';
  shape: 'rounded' | 'circular';
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}
const AppPagination = (props: AppPaginationProps) => {
  const { count, variant = 'outlined', shape, onChange } = props;
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        variant='outlined'
        shape={shape}
        onChange={onChange}
      />
    </Stack>
  );
};

AppPagination.defaultProps = {
  count: 10,
  variant: 'outlined',
  shape: 'rounded',
  onChange: () => {},
};

export default AppPagination;
