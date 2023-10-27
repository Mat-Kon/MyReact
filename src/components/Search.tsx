import { Component, FormEvent, ReactNode, useEffect, useState } from 'react';
import Loader from './Loader';
import { Item } from '../types/types';
import { Api } from '../api/api';
import Form from './Form';
import Results from './Results';

const Search: React.FC = () => {
  const [items, setItems] = useState<Item[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<string | null>(localStorage.getItem('searchValue'));
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (value) {
      searchItem(value);
    } else {
      getAllItems();
    }
  }, [value]);

  const handlerSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoading(true);
    setValue(localStorage.getItem('searchValue') ?? '');
  };

  const getAllItems = async (): Promise<void> => {
    const items: Item[] = await new Api().getItems(1);
    setItems(items);
    setIsLoading(false);
  };

  const searchItem = async (value: string) => {
    const items = await new Api().getSearchItems(value);
    if (items && items.length > 0) {
      setItems(items);
    } else {
      setItems(null);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="search">
        <h1 className="heading">Star Wars Searching</h1>
        <Loader isLoading={isLoading} />
        <Form handlerSubmitForm={handlerSubmitForm} isLoading={isLoading} />
      </div>
      <Results items={items} page={page} />
    </>
  );
};

export default Search;
