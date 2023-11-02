import Search from './Search';
import { createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { IIsLoading, IMaxPage, ISearchValue } from '../types/types';

const localStorageValue = localStorage.getItem('searchValue');

const MaxPage = createContext<IMaxPage>({ maxPage: 0, setMaxPage: null });
const IsLoading = createContext<IIsLoading>({ isLoading: false, setLoading: null });
const SearchValue = createContext<ISearchValue>({ search: '', setSearch: null });

const Wrapper: React.FC = () => {
  const [maxPage, setMaxPage] = useState(1);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorageValue) {
      console.log(localStorageValue);
    } else {
      setSearch(localStorageValue);
    }
    navigate('/search-page/1');
  }, []);

  return (
    <MaxPage.Provider value={{ maxPage, setMaxPage }}>
      <IsLoading.Provider value={{ isLoading, setLoading }}>
        <SearchValue.Provider value={{ search, setSearch }}>
          <div className="wrapper">
            <Search />
            <Outlet />
          </div>
        </SearchValue.Provider>
      </IsLoading.Provider>
    </MaxPage.Provider>
  );
};

export default Wrapper;
export { MaxPage, IsLoading, SearchValue };
