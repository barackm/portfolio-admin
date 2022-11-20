import { useEffect, useState } from 'react';
import { debouncedUpdateSearch } from '../utlis/constants/browserHistory';
import { readFromQueryString } from '../utlis/queryParams';
import useSearch from './useSearch';

/**
 * Creates the state synchronized with query params
 * @param queryParamName
 * @param defaultValue
 * @param suspend
 */
const useSyncWithSearch = (
  queryParamName: string,
  defaultValue: any,
  suspend: any,
) => {
  const search = useSearch();
  const [observableVariable, handleSearchUpdate] = useState(
    readFromQueryString(search, queryParamName) || '',
  );

  const syncWithQueryParam = (value: any) =>
    debouncedUpdateSearch({
      [queryParamName]: value,
    });

  // Observe search update and sync state with query params
  useEffect(() => {
    const searchValue = readFromQueryString(search, queryParamName);

    if (!searchValue && defaultValue && !suspend) {
      syncWithQueryParam(defaultValue);
    }

    if (searchValue !== observableVariable) {
      handleSearchUpdate(searchValue ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return [observableVariable, syncWithQueryParam];
};

export default useSyncWithSearch;
