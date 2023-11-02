import Search from './Search';
import { createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { IContext, ISearchValue } from '../types/types';

const localStorageValue = localStorage.getItem('searchValue');

const SearchValue = createContext<ISearchValue>({ search: '', setSearch: null });

const Wrapper: React.FC = () => {
  const [maxPage, setMaxPage] = useState(1);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(false);

  const context: IContext = {
    maxPage,
    setMaxPage,
    isLoading,
    setLoading,
  };

  useEffect(() => {
    if (localStorageValue) {
      setSearch(localStorageValue);
    }
    navigate('/search-page/1');
  }, []);

  return (
    <SearchValue.Provider value={{ search, setSearch }}>
      <div className="wrapper">
        <Search isLoading={isLoading} />
        <Outlet context={context} />
      </div>
    </SearchValue.Provider>
  );
};

export default Wrapper;
export { SearchValue };
