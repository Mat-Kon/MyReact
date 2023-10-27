import { Component, FormEvent, MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import Loader from './Loader';
import { Items, Result } from '../types/types';
import { Api } from '../api/api';
import Form from './Form';
import Results from './Results';

const Search: React.FC = () => {
  const [items, setItems] = useState<Items | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<string | null>(localStorage.getItem('searchValue'));
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    if (value) {
      searchItem(value);
    } else {
      getAllItems();
    }
  }, [value, page]);

  const handlerSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoading(true);
    setPage(1);
    setValue(localStorage.getItem('searchValue') ?? '');
  };

  const getAllItems = async (): Promise<void> => {
    const items: Items = await new Api().getItems(page);
    setItems(items);
    setIsLoading(false);
  };

  const searchItem = async (value: string) => {
    const data: Result = await new Api().getSearchItems(value, page);
    const resItems = data.items;
    const curMaxPage = Math.ceil(data.count / 10);
    if (resItems.length > 0) {
      setItems(resItems);
      setMaxPage(curMaxPage);
      setIsLoading(false);
    } else {
      setItems(null);
      setIsLoading(false);
    }
  };

  const nextPage = () => {
    if (items!.length < 10 || page === maxPage) {
      setIsLoading(false);
      return;
    }
    setPage((prevCount) => prevCount + 1);
  };

  const paginationHandler: MouseEventHandler<HTMLDivElement> = async (e) => {
    setIsLoading(true);
    const targetElem = e.target as HTMLElement;
    if (targetElem.className === 'next') {
      nextPage();
    }
    if (targetElem.className === 'prev') {
      console.log(targetElem.className);
    }
  };

  return (
    <>
      <div className="search">
        <h1 className="heading">Star Wars Searching</h1>
        <Loader isLoading={isLoading} />
        <Form handlerSubmitForm={handlerSubmitForm} isLoading={isLoading} />
      </div>
      <Results items={items} page={page} nextPage={paginationHandler} />
    </>
  );
};

export default Search;
