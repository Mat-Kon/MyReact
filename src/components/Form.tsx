import { ChangeEvent, ChangeEventHandler, FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchValue } from './Wrapper';
import { ISearchProps } from '../types/types';

const Form: React.FC<ISearchProps> = ({ isLoading, setQuantity }) => {
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
    navigate('/search-page/1');
  };

  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const handlerChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setQuantity(+e.target.value);
    navigate('/search-page/1');
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
      <select name="select" id="quantity" className="quantity" onChange={handlerChange}>
        <option value="2">2</option>
        <option value="6">6</option>
        <option selected value="10">
          10
        </option>
      </select>
    </form>
  );
};

export default Form;
