import { useContext, useEffect, useState } from 'react';
import { IContext, Items, Result } from '../types/types';
import ItemsBlockList from './ItemsBlockList';
import { Api } from '../api/api';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import { SearchValue } from './Wrapper';
import Loader from './Loader';
import Pagination from './Pagination';

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
    setLoading(false);
  };

  const searchItem = async (value: string) => {
    const data: Result = await new Api().getSearchItems(value, +page!);
    const curMaxPage = isNaN(Math.ceil(data.count / 10)) ? 0 : Math.ceil(data.count / 10);
    if (setMaxPage) setMaxPage(curMaxPage);
    if (data.items.length) {
      const newItem = data.items.slice(0, quantity);
      setItems(newItem);
    } else {
      setItems([]);
      // setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="results">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="results__wrapper">
          <ItemsBlockList items={items} />
          {maxPage > 1 && !isLoading ? <Pagination /> : null}
        </div>
      )}
      {isDetail ? <Outlet context={{ isLoading, setLoading, setDetail }} /> : null}
      {!items.length && maxPage === 0 ? <p className="not-found">not found</p> : null}
    </div>
  );
};

export default Results;
