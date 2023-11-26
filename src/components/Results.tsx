'useClient';
import { ReactNode, useEffect, useState } from 'react';
import { Items } from '../types/types';
import ItemsBlockList from './ItemsBlockList';
import { useGetItemsQuery, useSearchItemsQuery } from '../api/api';
import Loader from './Loader';
import Pagination from './Pagination';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setItems } from '../store/itemsSlice';
import { toggleLoading } from '../store/loadingSlice';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import PageLoader from './PageLoader';

const Results: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { pageNum } = useParams();
  const [maxPage, setMaxPage] = useState(0);
  const quantity = useAppSelector((store) => store.quantity.value);
  const dispatch = useAppDispatch();
  const search = useAppSelector((store) => store.search.value);
  const isDetail = useAppSelector((store) => store.detail.isOpen);
  const {
    data: itemsData,
    isLoading: itemsIsLoading,
    isFetching: itemsIsFetching,
  } = useGetItemsQuery(pageNum as string);
  const {
    data: searchData,
    isLoading: searchIsLoading,
    isFetching: searchIsFetching,
  } = useSearchItemsQuery({ value: search, page: pageNum as string });

  const isLoading = itemsIsLoading || itemsIsFetching || searchIsLoading || searchIsFetching;

  useEffect(() => {
    if (!pageNum) {
      router.push('/search-page/1');
    }
    dispatch(toggleLoading(isLoading));
    if (search !== '') {
      searchItems();
    } else {
      allItems();
    }
  }, [isLoading, pageNum, quantity, search]);

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
      <PageLoader />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="results__wrapper" data-testid="results__wrapper">
          <ItemsBlockList data-testid="items" />
          {maxPage > 1 && !isLoading ? <Pagination maxPage={maxPage} /> : null}
        </div>
      )}
      {isDetail ? children : null}
    </div>
  );
};

export default Results;
