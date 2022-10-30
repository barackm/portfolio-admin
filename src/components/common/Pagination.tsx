import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface AppPaginationProps {
  count: number;
  variant: 'text' | 'outlined';
  shape: 'rounded' | 'circular';
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}
const AppPagination = (props: AppPaginationProps) => {
  const { count, variant, shape, onChange } = props;
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        variant={variant}
        shape={shape}
        onChange={onChange}
      />
    </Stack>
  );
};

AppPagination.defaultProps = {
  count: 10,
  variant: 'text',
  shape: 'circular',
  onChange: () => {},
};

export default AppPagination;
