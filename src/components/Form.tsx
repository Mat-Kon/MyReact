import { ChangeEvent, ChangeEventHandler, FormEvent, useContext, useEffect, useState } from 'react';
import { IsLoading, Quantity, SearchValue } from './Wrapper';
import { useNavigate } from 'react-router';

const Form: React.FC = () => {
  const navigate = useNavigate();
  const { setSearch } = useContext(SearchValue);
  const { isLoading } = useContext(IsLoading);
  const { setQuantity } = useContext(Quantity);
  const [value, setValue] = useState('');
  const [selectValue, setSelectValue] = useState(10);

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
    if (setQuantity) setQuantity(+e.target.value);
    setSelectValue(+e.target.value);
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
      <select
        value={selectValue}
        name="select"
        id="quantity"
        className="quantity"
        onChange={handlerChange}
      >
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </form>
  );
};

export default Form;
