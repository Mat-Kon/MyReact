import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  isLoading: boolean;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Form: React.FC<Props> = ({ isLoading, setSearchValue, setPage }) => {
  const [value, setValue] = useState(localStorage.getItem('searchValue') ?? '');

  const handlerSubmit = () => {
    localStorage.setItem('searchValue', value);
    setPage(1);
    setSearchValue(value);
  };

  return (
    <form className="search__form" action="search">
      <input
        className="search__input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isLoading}
      />
      <Link
        to={`search-page/1`}
        className="search__btn"
        onClick={handlerSubmit}
        style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
      >
        Search
      </Link>
    </form>
  );
};

export default Form;
