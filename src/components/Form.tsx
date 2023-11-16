import { ChangeEvent, ChangeEventHandler, FormEvent, useContext, useEffect, useState } from 'react';
import { Quantity } from './Wrapper';
import { useNavigate } from 'react-router';
import { updateSearch } from '../store/searchSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { toggleLoading } from '../store/loadingSlice';

const Form: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.loading);
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
    localStorage.setItem('searchValue', value);
    dispatch(updateSearch(value));
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
