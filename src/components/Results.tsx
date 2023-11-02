import { useContext, useEffect, useState } from 'react';
import { Items, Result } from '../types/types';
import ItemsBlockList from './ItemsBlockList';
import { Api } from '../api/api';
import { Outlet, useParams } from 'react-router-dom';
import { IsLoading, MaxPage, SearchValue } from './Wrapper';
import Loader from './Loader';
import Pagination from './Pagination';

const Results: React.FC = () => {
  const { page } = useParams();
  const { maxPage, setMaxPage } = useContext(MaxPage);
  const { isLoading, setLoading } = useContext(IsLoading);
  const [items, setItems] = useState<Items>([]);
  const { search } = useContext(SearchValue);

  useEffect(() => {
    if (setLoading) setLoading(true);
    if (search !== '') {
      searchItem(search);
    } else {
      getAllItems();
    }
    console.log(search);
  }, [search, page]);

  const getAllItems = async (): Promise<void> => {
    if (!page) {
      if (setLoading) setLoading(false);
      return;
    } else {
      console.log('getAll');
      const data: Result = await new Api().getItems(+page);
      const curMaxPage = Math.ceil(data.count / 10);
      setItems(data.items);
      if (setMaxPage) setMaxPage(curMaxPage);
      if (setLoading) setLoading(false);
    }
  };

  const searchItem = async (value: string) => {
    const data: Result = await new Api().getSearchItems(value, +page!);
    const curMaxPage = isNaN(Math.ceil(data.count / 10)) ? 0 : Math.ceil(data.count / 10);
    if (setMaxPage) setMaxPage(curMaxPage);
    if (data.items.length) {
      setItems(data.items);
    } else {
      setItems([]);
      if (setLoading) setLoading(false);
    }
    if (setLoading) setLoading(false);
  };

  return (
    <div className="results">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="results__wrapper">
          <ItemsBlockList items={items} />
          {maxPage !== 0 && !isLoading ? <Pagination /> : null}
        </div>
      )}
      {!items.length && maxPage === 0 ? <p className="not-found">not found</p> : null}
    </div>
  );
};

export default Results;
