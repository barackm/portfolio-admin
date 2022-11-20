import { isNumber, omitBy } from 'lodash';

/**
 * Removes keys for empty query param values
 * @param queryParams
 */
export const sanitizeQueryParams = (queryParams: any) =>
  omitBy(queryParams, (value) => !isNumber(value) && !value);

/**
 * Builds query string based on passed params
 * @param search
 * @param initialValue
 * @param skipExisted
 */
export const buildQueryString = (
  search: any,
  initialValue = '',
  skipExisted = false,
) => {
  const searchParams = new URLSearchParams(initialValue);

  Object.keys(search).forEach((paramKey) => {
    if (!(skipExisted && searchParams.has(paramKey))) {
      const rawValue = search[paramKey];
      const value = rawValue?.toString();

      if (!value) {
        searchParams.delete(paramKey);
      } else if (rawValue instanceof Array) {
        searchParams.delete(paramKey);
        rawValue.forEach((val) => searchParams.append(paramKey, val));
      } else {
        searchParams.set(paramKey, value);
      }
    }
  });

  return `?${searchParams.toString()}`;
};

/**
 * Retrieves the query string param value
 * @param queryString
 * @param name
 * @param isArray
 */
export const readFromQueryString = (
  queryString: string,
  name: string,
  isArray = false,
) => {
  const params = new URLSearchParams(queryString);

  return isArray ? params.getAll(name) : params.get(name);
};

/**
 * Retrieves the query string keys and values in the object shape
 * @param queryString
 */
export const readAllFromQueryParams = (queryString: any) => {
  const result: any = {};
  new URLSearchParams(queryString).forEach((value: any, key: string) => {
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      const currentValue: any = result[key as keyof typeof result];

      result[key] =
        currentValue instanceof Array
          ? [...currentValue, value]
          : [currentValue, value];
    } else {
      result[key] = value;
    }
  });
  return result;
};
