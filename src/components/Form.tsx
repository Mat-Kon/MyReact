import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  isLoading: boolean;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Form: React.FC<Props> = ({ isLoading, setSearchValue, setPage }) => {
  const [value, setValue] = useState(localStorage.getItem('searchValue') ?? '');

  const saveValueInStorage = () => {
    localStorage.setItem('searchValue', value);
  };

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    setSearchValue(localStorage.getItem('searchValue') ?? '');
  };

  return (
    <form className="search__form" action="search" onSubmit={handlerSubmit}>
      <input
        className="search__input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isLoading}
      />
      <button className="search__btn" onClick={saveValueInStorage} disabled={isLoading}>
        Search
      </button>
    </form>
  );
};

export default Form;
