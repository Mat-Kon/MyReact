import * as React from 'react';
import Results from './Results';
import Search from './Search';
import { useEffect, useState } from 'react';

type IWrapperProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Wrapper: React.FC<IWrapperProps> = ({ page, setPage }) => {
  const [searchValue, setSearchValue] = useState('');
  const [maxPage, setMaxPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const localStorageValue = localStorage.getItem('searchValue');
    if (localStorageValue) {
      setSearchValue(localStorageValue);
    }
  }, []);

  return (
    <div className="wrapper">
      <Search isLoading={isLoading} setSearchValue={setSearchValue} setPage={setPage} />
      <Results
        value={searchValue}
        page={page}
        setPage={setPage}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        maxPage={maxPage}
        setMaxPage={setMaxPage}
      />
    </div>
  );
};

export default Wrapper;
