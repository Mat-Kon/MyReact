import { createContext, useContext, useEffect, useState } from 'react';
import { IContext, IItems, Items, Result } from '../types/types';
import ItemsBlockList from './ItemsBlockList';
import { Api } from '../api/api';
import { useParams } from 'react-router-dom';
import { SearchValue } from './Wrapper';
import Loader from './Loader';
import Pagination from './Pagination';
import { Outlet, useOutletContext } from 'react-router';

const ItemsContext = createContext<IItems>({ items: [], setItems: null });

const Results: React.FC = () => {
  const { page } = useParams();
  const { maxPage, setMaxPage, isLoading, setLoading, isDetail, setDetail, quantity } =
    useOutletContext<IContext>();
  const [items, setItems] = useState<Items>([]);
  const { search } = useContext(SearchValue);

  useEffect(() => {
    setLoading(true);
    if (search) {
      searchItem(search);
    } else {
      getAllItems();
    }
  }, [search, page, quantity]);

  const getAllItems = async (): Promise<void> => {
    try {
      if (!page) {
        setLoading(false);
        return;
      } else {
        const data: Result = await new Api().getItems(+page);
        const curMaxPage = Math.ceil(data.count / 10);
        const newItem = data.items.slice(0, quantity);
        setItems(newItem);
        if (setMaxPage) setMaxPage(curMaxPage);
      }
    } catch {
      console.log('No items');
    } finally {
      setLoading(false);
    }
  };

  const searchItem = async (value: string) => {
    try {
      const data: Result = await new Api().getSearchItems(value, +page!);
      const curMaxPage = isNaN(Math.ceil(data.count / 10)) ? 0 : Math.ceil(data.count / 10);
      if (setMaxPage) setMaxPage(curMaxPage);
      if (data.items.length) {
        const newItem = data.items.slice(0, quantity);
        setItems(newItem);
      } else {
        setItems([]);
      }
    } catch {
      console.log('No items');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      <div className="results">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="results__wrapper">
            <ItemsBlockList />
            {maxPage > 1 && !isLoading ? <Pagination /> : null}
          </div>
        )}
        {isDetail ? <Outlet context={{ isLoading, setLoading, setDetail }} /> : null}
        {!items.length && maxPage === 0 ? <p className="not-found">not found</p> : null}
      </div>
    </ItemsContext.Provider>
  );
};

export default Results;
export { ItemsContext };
