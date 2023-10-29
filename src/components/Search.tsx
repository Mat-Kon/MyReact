import { FormEvent, useEffect, useState } from 'react';
import Loader from './Loader';
import { Items, Result } from '../types/types';
import { Api } from '../api/api';
import Form from './Form';
import Results from './Results';
import Pagination from './Pagination';

const Search: React.FC = () => {
  const [items, setItems] = useState<Items | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(localStorage.getItem('searchValue'));
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

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
    if (value) {
      searchItem(value);
    } else {
      getAllItems();
    }
  }, [value, page]);

  const handlerSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setPage(1);
    setIsLoading(true);
    setValue(localStorage.getItem('searchValue') ?? '');
  };

  return (
    <>
      <div className="search">
        <h1 className="heading">Star Wars Searching</h1>
        <Loader isLoading={isLoading} />
        <Form handlerSubmitForm={handlerSubmitForm} isLoading={isLoading} />
      </div>
      <Results items={items} />
      {items && items.length !== 0 ? (
        <Pagination page={page} maxPage={maxPage} isLoading={isLoading} setPage={setPage} />
      ) : null}
    </>
  );
};

export default Search;
