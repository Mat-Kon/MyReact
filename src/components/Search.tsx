import { Api } from '../api/api';
import { IFilm, IPeople, IPlanet, ISpecies, IStarShips, IVehicles } from '../types/types';

const Search: React.FC = () => {
  const search: React.MouseEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    const inputElem = document.querySelector('.search__input') as HTMLInputElement;
    const resultWrap = document.querySelector('.results__wrapper') as HTMLInputElement;
    resultWrap.innerHTML = '';
    const inputValue = inputElem.value;
    localStorage.setItem('searchValue', inputValue);
    if (inputValue === '') {
      const allInfo = await new Api().getAll();
      const results: (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[] = (
        [] as (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[]
      ).concat(...allInfo);
      results.forEach((item: IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result__item');
        const keys = Object.keys(item);
        const values: string | string[] | number = Object.values(item);
        keys.forEach((key, index) => {
          const firsValue = document.createElement('h2');
          firsValue.classList.add('item__name');
          const secondValue = document.createElement('p');
          secondValue.classList.add('item__value');
          firsValue.textContent = key;
          let value: string;
          value = values[index];
          if (Array.isArray(value)) {
            value = value.join('<br>');
          }
          value = value ? value : 'not';
          secondValue.innerHTML = `${value}`;
          resultItem.append(firsValue, secondValue);
        });
        resultWrap.append(resultItem);
      });
    }
    inputElem.value = '';
  };

  return (
    <div className="search">
      <h1 className="heading">Star Wars Searching</h1>
      <form className="search__form" action="search">
        <input className="search__input" type="text" placeholder="enter" />
        <input className="search__btn" type="submit" value="Search" onClick={search} />
      </form>
    </div>
  );
};

export { Search };
