import { Api } from '../api/api';
import { IFilm, IPeople, IPlanet, ISpecies, IStarShips, IVehicles } from '../types/types';
import { resultClasses } from './Results';

const searchClasses = Object.freeze({
  SEARCH: 'search',
  HEADING: 'heading',
  FORM: 'search__form',
  INPUT: 'search__input',
  BTN: 'search__btn',
});

const Search: React.FC = () => {
  window.onload = () => {
    getFromLocal();
  };

  const viewAllValue = async (): Promise<void> => {
    const resultWrap = document.querySelector(`.${resultClasses.WRAPPER}`) as HTMLInputElement;
    resultWrap.innerHTML = '';
    const allInfo = await new Api().getAll();
    const results: (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[] = (
      [] as (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[]
    ).concat(...allInfo);
    results.forEach((item: IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips) => {
      const resultItem = document.createElement('div');
      resultItem.classList.add(resultClasses.ITEM);
      const keys = Object.keys(item);
      const values: string | string[] | number = Object.values(item);
      keys.forEach((key, index) => {
        const firsValue = document.createElement('h2');
        firsValue.classList.add(resultClasses.NAME);
        const secondValue = document.createElement('p');
        secondValue.classList.add(resultClasses.VALUE);
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
  };

  const searchValue = async (value: string): Promise<void> => {
    const resultWrap = document.querySelector(`.${resultClasses.WRAPPER}`) as HTMLInputElement;
    resultWrap.innerHTML = '';
    console.log(value);
  };

  const search: React.MouseEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const inputElem = document.querySelector(`.${searchClasses.INPUT}`) as HTMLInputElement;
    const value: string = inputElem.value;
    localStorage.setItem('searchValue', value);

    if (value === '') {
      viewAllValue();
    } else {
      searchValue(value);
    }
  };

  const getFromLocal = (): void => {
    const input = document.querySelector(`.${searchClasses.INPUT}`) as HTMLInputElement;
    const value = localStorage.getItem('searchValue') ?? '';
    input.value = value;
  };

  return (
    <div className={searchClasses.SEARCH}>
      <h1 className={searchClasses.HEADING}>Star Wars Searching</h1>
      <form className={searchClasses.FORM} action="search">
        <input className={searchClasses.INPUT} type="text" />
        <input className={searchClasses.BTN} type="submit" value="Search" onClick={search} />
      </form>
    </div>
  );
};

export { Search };
