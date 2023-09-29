import { Api } from '../api/api';
import { Category, IFilm, IPeople, IPlanet, ISpecies, IStarShips, IVehicles } from '../types/types';
import { resultClasses } from './Results';

const searchClasses = Object.freeze({
  SEARCH: 'search',
  HEADING: 'heading',
  FORM: 'search__form',
  INPUT: 'search__input',
  BTN: 'search__btn',
});

const categories = ['people', 'planets', 'films', 'species', 'vehicles', 'starships'];

const Search: React.FC = () => {
  window.onload = () => {
    getFromLocal();
  };

  const createItemBlock = (
    item: IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips
  ): HTMLDivElement => {
    const resultItemWrapper = document.createElement('div');
    resultItemWrapper.classList.add('result__item-wrapper');
    const resultItem = document.createElement('div');
    resultItem.classList.add(resultClasses.ITEM);
    resultItemWrapper.append(resultItem);
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
    return resultItemWrapper;
  };

  const viewAllValue = async (): Promise<void> => {
    const resultWrap = document.querySelector(`.${resultClasses.WRAPPER}`) as HTMLInputElement;
    const allInfo = await new Api().getAll();
    const results: (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[] = (
      [] as (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[]
    ).concat(...allInfo);
    results.forEach((item: IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips) => {
      const resultItem = createItemBlock(item);
      resultWrap.append(resultItem);
    });
  };

  const viewCategory = async (value: string): Promise<void> => {
    const resultWrap = document.querySelector(`.${resultClasses.WRAPPER}`) as HTMLInputElement;

    const items: (IPlanet | IFilm | ISpecies | IVehicles | IStarShips | IPeople)[] | null =
      await new Api().getCategory(value as Category);

    items?.forEach((item: IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips) => {
      const resultItem = createItemBlock(item);
      resultWrap.append(resultItem);
    });
  };

  const viewSearchValue = async (value: string) => {
    const resultWrap = document.querySelector(`.${resultClasses.WRAPPER}`) as HTMLInputElement;
    const regValue: RegExp = new RegExp(`\\b${value}\\b`, 'i');
    const allCategories: (IPlanet | IFilm | ISpecies | IVehicles | IStarShips | IPeople)[][] =
      await new Api().getAll();
    const items: (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[] = (
      [] as (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[]
    ).concat(...allCategories);
    const result: (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[] = [];
    items.forEach((item) => {
      const keys = Object.keys(item);
      const hasKeys = keys.filter((value) => regValue.test(value)).length > 0;
      const values = Object.values(item);
      const hasValues = values.filter((value) => regValue.test(value)).length > 0;
      if (hasKeys || hasValues) {
        result.push(item);
      }
    });
    if (result.length > 0) {
      result.forEach((item: IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips) => {
        const resultItem = createItemBlock(item);
        resultWrap.append(resultItem);
      });
    } else {
      const notFound = document.createElement('h1');
      notFound.textContent = `I not fond "${value}"`;
      resultWrap.append(notFound);
    }
  };

  const search: React.MouseEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const resultWrap = document.querySelector(`.${resultClasses.WRAPPER}`) as HTMLInputElement;
    resultWrap.innerHTML = '';
    const inputElem = document.querySelector(`.${searchClasses.INPUT}`) as HTMLInputElement;
    const value: string = inputElem.value.trim();
    const hasCategory = categories.find((item) => value === item);
    localStorage.setItem('searchValue', value);

    if (value === '') {
      viewAllValue();
    }
    if (hasCategory) {
      viewCategory(value);
    }
    viewSearchValue(value);
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
