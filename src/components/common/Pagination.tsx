import React, { useEffect, useRef, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import useSearch from '../../hooks/useSearch';
import useSyncWithSearch from '../../hooks/useSyncWithSearch';
import { readFromQueryString } from '../../utlis/queryParams';
import useDidUpdate from '../../hooks/useDidUpdate';
import { updateSearch } from '../../utlis/constants/browserHistory';

interface AppPaginationProps {
  variant: 'text' | 'outlined';
  shape: 'rounded' | 'circular';
  pageNumberQueryField: string;
  total: number;
  pageSizeQueryField: string;
}

const AppPagination = (props: AppPaginationProps) => {
  const {
    variant,
    shape,
    pageNumberQueryField = 'page',
    total,
    pageSizeQueryField = 'limit',
  } = props;

  const search = useSearch();
  const searchRef = useRef(search);

  const [pageNumberSearch, setPageNumberSearch] = useSyncWithSearch(
    pageNumberQueryField,
    readFromQueryString(search, pageNumberQueryField) ?? '1',
    !search,
  );

  const [pageSize, setPageSizeSearch] = useSyncWithSearch(
    pageNumberQueryField,
    readFromQueryString(search, pageSizeQueryField) ?? '10',
    !search,
  );

  const pageNumber = Number(pageNumberSearch);
  const setPageNumber = (pageNumberNumber: number) =>
    // @ts-ignore
    setPageNumberSearch(String(pageNumberNumber));

  setTimeout(() => {
    if (
      !readFromQueryString(searchRef.current, pageNumberQueryField) &&
      !readFromQueryString(searchRef.current, pageSizeQueryField)
    ) {
      updateSearch({
        [pageNumberQueryField]: '1',
      });
    }
  }, 300);

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  useEffect(() => {
    if (total && total <= Number(pageSize)) {
      setPageNumber(1);
    }
  }, [total, pageSize]);

  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(total / Number(pageSize || 10))}
        variant={variant}
        shape={shape}
        onChange={(_event, value) => setPageNumber(value)}
        page={pageNumber}
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
