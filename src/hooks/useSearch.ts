import { useEffect, useState } from 'react';
import history from '../utlis/constants/history';

const useSearch = () => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (history) {
      return history.listen(({ search: val }: any) => {
        setSearch(val);
      });
    }
  }, []);

  return search;
};

export default useSearch;
