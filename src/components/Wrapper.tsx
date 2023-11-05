import Search from './Search';
import { MouseEvent, MouseEventHandler, createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { IContext, ILoading, IQuantity, ISearchValue } from '../types/types';

const localStorageValue = localStorage.getItem('searchValue');

const SearchValue = createContext<ISearchValue>({ search: '', setSearch: null });
const IsLoading = createContext<ILoading>({ isLoading: false, setLoading: null });
const Quantity = createContext<IQuantity>({ quantity: 0, setQuantity: null });

const Wrapper: React.FC = () => {
  const [maxPage, setMaxPage] = useState(1);
  const navigate = useNavigate();
  const [search, setSearch] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isDetail, setDetail] = useState(false);
  const [quantity, setQuantity] = useState(10);

  const context: IContext = {
    maxPage,
    setMaxPage,
    isLoading,
    setLoading,
    isDetail,
    setDetail,
    quantity,
  };

  useEffect(() => {
    if (localStorageValue) {
      setSearch(localStorageValue);
    }
    navigate('/search-page/1');
  }, []);

  const handlerClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const targElem = e.target as HTMLElement;
    if (
      targElem.className === 'results' ||
      targElem.className === 'wrapper' ||
      targElem.className === 'search'
    ) {
      setDetail(false);
    }
  };

  return (
    <SearchValue.Provider value={{ search, setSearch }}>
      <IsLoading.Provider value={{ isLoading, setLoading }}>
        <Quantity.Provider value={{ quantity, setQuantity }}>
          <div className="wrapper" onClick={handlerClick}>
            <Search />
            <Outlet context={context} />
          </div>
        </Quantity.Provider>
      </IsLoading.Provider>
    </SearchValue.Provider>
  );
};

export default Wrapper;
export { SearchValue, IsLoading, Quantity };
