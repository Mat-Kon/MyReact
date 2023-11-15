import { useContext, useEffect } from 'react';
import { IContext, Items, Result } from '../types/types';
import ItemsBlockList from './ItemsBlockList';
import { Api } from '../api/api';
import { useParams } from 'react-router-dom';
import { SearchValue } from './Wrapper';
import Loader from './Loader';
import Pagination from './Pagination';
import { Outlet, useOutletContext } from 'react-router';
import { useAppDispatch } from '../hooks/hooks';
import { setItems } from '../redux/itemsSlice';

const Results: React.FC = () => {
  const { page } = useParams();
  const { maxPage, setMaxPage, isLoading, setLoading, isDetail, setDetail, quantity } =
    useOutletContext<IContext>();
  const dispatch = useAppDispatch();
  const { search } = useContext(SearchValue);

  useEffect(() => {
    setLoading(true);
    if (search !== '') searchItem(search);
    if (search === '') getAllItems();
  }, [search, page, quantity]);

  const updateItems = (newItems: Items) => {
    dispatch(setItems({ items: newItems }));
  };

  const getAllItems = async (): Promise<void> => {
    try {
      if (!page) return;
      const data: Result = await new Api().getItems(+page);
      const curMaxPage = Math.ceil(data.count / 10);
      const newItem = data.items.slice(0, quantity);
      updateItems(newItem);
      if (setMaxPage) setMaxPage(curMaxPage);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const searchItem = async (value: string) => {
    try {
      if (!page) return;
      const data: Result = await new Api().getSearchItems(value, +page!);
      const curMaxPage = isNaN(Math.ceil(data.count / 10)) ? 0 : Math.ceil(data.count / 10);
      if (setMaxPage) setMaxPage(curMaxPage);
      if (data.items.length) {
        const newItem = data.items.slice(0, quantity);
        updateItems(newItem);
      } else {
        updateItems([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="results">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="results__wrapper" data-testid="results__wrapper">
          <ItemsBlockList data-testid="items" />
          {maxPage > 1 && !isLoading ? <Pagination /> : null}
        </div>
      )}
      {isDetail ? <Outlet context={{ isLoading, setLoading, setDetail }} /> : null}
    </div>
  );
};

export default Results;
