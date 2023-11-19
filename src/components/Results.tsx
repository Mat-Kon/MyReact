import { useEffect, useState } from 'react';
import { IContext, Items } from '../types/types';
import ItemsBlockList from './ItemsBlockList';
import { useGetItemsQuery, useSearchItemsQuery } from '../api/api';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import Pagination from './Pagination';
import { Outlet, useNavigate, useOutletContext } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setItems } from '../store/itemsSlice';
import { toggleLoading } from '../store/loadingSlice';

const Results: React.FC = () => {
  const { page } = useParams();
  const [maxPage, setMaxPage] = useState(0);
  const { quantity } = useOutletContext<IContext>();
  const dispatch = useAppDispatch();
  const search = useAppSelector((store) => store.search.value);
  const isDetail = useAppSelector((store) => store.detail.isOpen);
  const {
    data: itemsData,
    isLoading: itemsIsLoading,
    isFetching: itemsIsFetching,
  } = useGetItemsQuery(page);
  const {
    data: searchData,
    isLoading: searchIsLoading,
    isFetching: searchIsFetching,
  } = useSearchItemsQuery({ value: search, page: page });
  const navigate = useNavigate();

  const isLoading = itemsIsLoading || itemsIsFetching || searchIsLoading || searchIsFetching;

  useEffect(() => {
    if (!page) {
      navigate('/search-page/1');
    }
    dispatch(toggleLoading(isLoading));
    if (search !== '') {
      searchItems();
    } else {
      allItems();
    }
  }, [isLoading, page, quantity, search]);

  const updateItems = (newItems: Items) => {
    dispatch(setItems({ items: newItems }));
  };

  const allItems = (): void => {
    if (itemsData) {
      const curMaxPage: number = Math.ceil(itemsData.count / 10);
      const newItem: Items = itemsData.results.slice(0, quantity);
      updateItems(newItem);
      setMaxPage(curMaxPage);
    }
  };

  const searchItems = () => {
    if (searchData) {
      const curMaxPage = Math.ceil(searchData.count / 10);
      const newItem = searchData.results.slice(0, quantity);
      updateItems(newItem);
      setMaxPage(curMaxPage);
    }
  };

  return (
    <div className="results">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="results__wrapper" data-testid="results__wrapper">
          <ItemsBlockList data-testid="items" />
          {maxPage > 1 && !isLoading ? <Pagination maxPage={maxPage} /> : null}
        </div>
      )}
      {isDetail ? <Outlet context={{ isLoading }} /> : null}
    </div>
  );
};

export default Results;
