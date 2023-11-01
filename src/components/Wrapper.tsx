import Search from './Search';
import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Pagination from './Pagination';

type MaxPageType = {
  maxPage: number;
  setMaxPage: React.Dispatch<React.SetStateAction<number>> | null;
};
type IsLoadingType = {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>> | null;
};

const MaxPage = createContext<MaxPageType>({ maxPage: 0, setMaxPage: null });
const IsLoading = createContext<IsLoadingType>({ isLoading: false, setLoading: null });

const Wrapper: React.FC = () => {
  const [maxPage, setMaxPage] = useState(0);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const localStorageValue = localStorage.getItem('searchValue');

  useEffect(() => {
    if (localStorageValue) {
      setSearchValue(localStorageValue);
      navigate('search-page/1');
    }
  }, [localStorageValue]);

  return (
    <MaxPage.Provider value={{ maxPage, setMaxPage }}>
      <IsLoading.Provider value={{ isLoading, setLoading }}>
        <div className="wrapper">
          <Search isLoading={isLoading} setSearchValue={setSearchValue} setPage={setPage} />
          <Outlet />
          {maxPage !== 0 ? <Pagination maxPage={maxPage} /> : null}
        </div>
      </IsLoading.Provider>
    </MaxPage.Provider>
  );
};

export default Wrapper;
export { MaxPage, IsLoading };
