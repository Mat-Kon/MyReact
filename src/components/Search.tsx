import { Api } from '../api/api';
import { IPeople } from '../types/types';

const Search: React.FC = () => {
  const getSearch: React.MouseEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    const inputElem = document.querySelector('.search__input') as HTMLInputElement;
    const resultWrap = document.querySelector('.results__wrapper') as HTMLInputElement;
    resultWrap.innerHTML = '';
    const inputValue = inputElem.value;

    localStorage.setItem('searchValue', inputValue);
    if (inputValue === '') {
      const allInfo: IPeople[][] = await new Api().getAll();
      const results: IPeople[] = ([] as IPeople[]).concat(...allInfo);
      results.forEach((item) => {
        if (item.name) {
          const nameElem = document.createElement('p');
          nameElem.textContent = item.name;
          resultWrap.append(nameElem);
        }
      });
      console.log(...results);
    }
    inputElem.value = '';
  };

  return (
    <div className="search">
      <h1 className="heading">Star Wars Searching</h1>
      <form className="search__form" action="search">
        <input className="search__input" type="text" placeholder="enter" />
        <input className="search__btn" type="submit" value="Search" onClick={getSearch} />
      </form>
    </div>
  );
};

export { Search };
