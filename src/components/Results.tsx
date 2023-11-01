import { useContext, useEffect, useState } from 'react';
import { Items, Result } from '../types/types';
import ItemsBlockList from './ItemsBlockList';
import { Api } from '../api/api';
import { useParams } from 'react-router-dom';
import { IsLoading, MaxPage } from './Wrapper';

const Results: React.FC = () => {
  const { page } = useParams();
  const { setMaxPage } = useContext(MaxPage);
  const { setLoading } = useContext(IsLoading);
  const [items, setItems] = useState<Items>([]);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (setLoading) setLoading(true);
    const localValue = localStorage.getItem('searchValue');
    if (localValue) setValue(localValue);
    if (value !== '') {
      searchItem(value);
    } else {
      getAllItems();
    }
  }, [value, page]);

  const getAllItems = async (): Promise<void> => {
    const data: Result = await new Api().getItems(+page!);
    setItems(data.items);
    if (setLoading) setLoading(false);
  };

  const searchItem = async (value: string) => {
    const data: Result = await new Api().getSearchItems(value, +page!);
    const curMaxPage = Math.ceil(data.count / 10);
    if (setMaxPage) setMaxPage(curMaxPage);
    if (data.items.length > 0) {
      setItems(data.items);
    } else {
      setItems([]);
    }
    if (setLoading) setLoading(false);
  };

  return (
    <div className="results">
      <div className="results__wrapper">
        <ItemsBlockList items={items} />
      </div>
    </div>
  );
};

export default Results;
