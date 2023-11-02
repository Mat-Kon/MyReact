import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchValue } from './Wrapper';

type Props = {
  isLoading: boolean;
};

const Form: React.FC<Props> = ({ isLoading }) => {
  const navigate = useNavigate();
  const { setSearch } = useContext(SearchValue);
  const [value, setValue] = useState('');

  useEffect(() => {
    const localValue = localStorage.getItem('searchValue');
    if (localValue) {
      setValue(localValue);
    }
  }, []);

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (setSearch) setSearch(value);
    localStorage.setItem('searchValue', value);
    navigate('search-page/1');
  };

  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  return (
    <form className="search__form" onSubmit={handlerSubmit}>
      <input
        className="search__input"
        type="text"
        value={value}
        onChange={handlerInput}
        disabled={isLoading}
      />
      <button className="search__btn" type="submit" disabled={isLoading}>
        Search
      </button>
    </form>
  );
};

export default Form;
