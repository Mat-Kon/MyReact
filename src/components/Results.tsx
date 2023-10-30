import { useEffect, useState } from 'react';
import { Items, Result } from '../types/types';
import ItemsBlockList from './ItemsBlockList';
import { Api } from '../api/api';
import Pagination from './Pagination';

type Props = {
  value: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  maxPage: number;
  setMaxPage: React.Dispatch<React.SetStateAction<number>>;
};

const Results: React.FC<Props> = ({
  value,
  page,
  setPage,
  maxPage,
  setMaxPage,
  isLoading,
  setIsLoading,
}) => {
  const [items, setItems] = useState<Items | null>([]);

  useEffect(() => {
    const getAllItems = async (): Promise<void> => {
      setIsLoading(true);
      const data: Result = await new Api().getItems(page);
      const curMaxPage = Math.ceil(data.count / 10);
      setMaxPage(curMaxPage);
      setItems(data.items);
      setIsLoading(false);
    };

    const searchItem = async (value: string) => {
      setIsLoading(true);
      const data: Result = await new Api().getSearchItems(value, page);
      const curMaxPage = Math.ceil(data.count / 10);
      if (data.items.length > 0) {
        setItems(data.items);
        setMaxPage(curMaxPage);
        setIsLoading(false);
      } else {
        setItems(null);
        setIsLoading(false);
      }
    };
    if (value !== '') {
      searchItem(value);
    } else {
      getAllItems();
    }
  }, [value, page]);

  return (
    <div className="results">
      <div className="results__wrapper">
        <ItemsBlockList items={items} />
      </div>
      {items ? (
        <Pagination page={page} maxPage={maxPage} isLoading={isLoading} setPage={setPage} />
      ) : null}
    </div>
  );
};

export default Results;
