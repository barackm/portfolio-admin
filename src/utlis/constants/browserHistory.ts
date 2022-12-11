import browserHistory from './history';
import { buildQueryString } from '../queryParams';
import { defaultDebounceValue } from './debounceSettings';

/**
 * Updates the browser history search value
 * @param search
 */
export const updateSearch = (search: {}) => {
  const currentPath = window.location.pathname;
  browserHistory?.replace({
    pathname: currentPath,
    search: buildQueryString(search, browserHistory.location.search),
  });
};

let pending = false;
let resultSearch = {};

/**
 * Updates the browser history search value with merged data
 * retrieved from the calls within the debounce interval
 * @param search
 */
export const debouncedUpdateSearch = (search: any) => {
  resultSearch = { ...resultSearch, ...search };

  if (pending) return;

  pending = true;

  setTimeout(() => {
    updateSearch(resultSearch);

    pending = false;
    resultSearch = {};
  }, Math.floor(defaultDebounceValue / 1.5));
};
