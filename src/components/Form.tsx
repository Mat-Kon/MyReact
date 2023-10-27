import { FormEvent, useEffect, useState } from 'react';

type Props = {
  handlerSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

const Form: React.FC<Props> = ({ isLoading, handlerSubmitForm }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const localStorageValue = localStorage.getItem('searchValue');
    if (localStorageValue) setValue(localStorageValue);
  }, []);

  const saveValueInStorage = () => {
    localStorage.setItem('searchValue', value);
  };

  return (
    <form className="search__form" action="search" onSubmit={handlerSubmitForm}>
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
