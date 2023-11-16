import { useEffect, useState } from 'react';
import { IContext, Items, Result } from '../types/types';
import ItemsBlockList from './ItemsBlockList';
import { useGetItemsQuery, useSearchItemsQuery } from '../api/api';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import Pagination from './Pagination';
import { Outlet, useOutletContext } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setItems } from '../store/itemsSlice';
import { toggleDetail } from '../store/detailSlice';
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

  const isLoading = itemsIsLoading || itemsIsFetching || searchIsLoading || searchIsFetching;

  useEffect(() => {
    dispatch(toggleLoading(isLoading));
    if (search !== '') {
      searchItem();
    } else {
      getAllItems();
    }
  }, [isLoading, page, quantity, search]);

  const updateItems = (newItems: Items) => {
    dispatch(setItems({ items: newItems }));
  };

  const getAllItems = (): void => {
    const curMaxPage: number = itemsData ? Math.ceil(itemsData.count / 10) : 0;
    const newItem: Items = itemsData ? itemsData.results.slice(0, quantity) : [];
    updateItems(newItem);
    setMaxPage(curMaxPage);
  };

  const searchItem = () => {
    const curMaxPage = searchData ? Math.ceil(searchData.count / 10) : 0;
    const newItem = searchData ? searchData.results.slice(0, quantity) : [];
    updateItems(newItem);
    setMaxPage(curMaxPage);
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
