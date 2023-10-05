import { Component, ReactNode } from 'react';
// import { Api } from '../api/api';
// import { Category, IFilm, IPeople, IPlanet, ISpecies, IStarShips, IVehicles } from '../types/types';
import { Loader } from './Loader';
// import { resultClasses } from './Results';

// const categories = ['people', 'planets', 'films', 'species', 'vehicles', 'starships'];

class Search extends Component {
  render(): ReactNode {
    return (
      <div className="search">
        <h1 className="heading">Star Wars Searching</h1>
        <Loader />
        <form className="search__form" action="search">
          <input className="search__input" type="text" />
          <input className="search__btn" type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

// const Search: React.FC = () => {
//   window.onload = () => {
//     getFromLocal();
//     viewAllValue();
//   };

//   const createItemBlock = (
//     item: IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips
//   ): HTMLDivElement => {
//     const resultItemWrapper = document.createElement('div');
//     resultItemWrapper.classList.add('result__item-wrapper');
//     const resultItem = document.createElement('div');
//     resultItem.classList.add(resultClasses.ITEM);
//     resultItemWrapper.append(resultItem);
//     Object.entries(item).map((value) => {
//       console.log(`key: ${value[0]}, value: ${value[1]}`);
//     });
//     const keys = Object.keys(item);
//     const values: string | string[] | number = Object.values(item);
//     keys.forEach((key, index) => {
//       const firsValue = document.createElement('h2');
//       firsValue.classList.add(resultClasses.NAME);
//       const secondValue = document.createElement('p');
//       secondValue.classList.add(resultClasses.VALUE);
//       firsValue.textContent = key;
//       let value: string;
//       value = values[index];
//       if (Array.isArray(value)) {
//         value = value.join('<br>');
//       }
//       value = value ? value : 'not';
//       secondValue.innerHTML = `${value}`;
//       resultItem.append(firsValue, secondValue);
//     });
//     return resultItemWrapper;
//   };

//   const viewAllValue = async (): Promise<void> => {
//     const resultWrap = document.querySelector(`.${resultClasses.WRAPPER}`);
//     const allInfo = await new Api().getAll();
//     allInfo.forEach((item: IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips) => {
//       const resultItem = createItemBlock(item);
//       resultWrap?.append(resultItem);
//     });
//   };

//   const viewCategory = async (value: string): Promise<void> => {
//     const resultWrap = document.querySelector(`.${resultClasses.WRAPPER}`);

//     const items: (IPlanet | IFilm | ISpecies | IVehicles | IStarShips | IPeople)[] =
//       await new Api().getCategory(value as Category);

//     items?.forEach((item: IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips) => {
//       const resultItem = createItemBlock(item);
//       resultWrap?.append(resultItem);
//     });
//   };

//   const viewSearchValue = async (value: string) => {
//     const resultWrap = document.querySelector(`.${resultClasses.WRAPPER}`);
//     const regValue: RegExp = new RegExp(`\\b${value}\\b`, 'i');
//     const allCategories: (IPlanet | IFilm | ISpecies | IVehicles | IStarShips | IPeople)[] =
//       await new Api().getAll();
//     const items: (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[] = (
//       [] as (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[]
//     ).concat(...allCategories);
//     const result: (IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips)[] = [];
//     items.forEach((item) => {
//       const keys = Object.keys(item);
//       const hasKeys = keys.filter((value) => regValue.test(value)).length > 0;
//       const values = Object.values(item);
//       const hasValues = values.filter((value) => regValue.test(value)).length > 0;
//       if (hasKeys || hasValues) {
//         result.push(item);
//       }
//     });
//     if (result.length > 0) {
//       result.forEach((item: IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips) => {
//         const resultItem = createItemBlock(item);
//         resultWrap?.append(resultItem);
//       });
//     } else {
//       const notFound = document.createElement('p');
//       notFound.classList.add('not-found');
//       notFound.textContent = `I not fond "${value}"`;
//       resultWrap?.append(notFound);
//     }
//   };

//   const search: React.MouseEventHandler<HTMLInputElement> = (e) => {
//     e.preventDefault();
//     const resultWrap = document.querySelector(`.${resultClasses.WRAPPER}`) as HTMLDivElement;
//     resultWrap.innerHTML = '';
//     const inputElem = document.querySelector(`.${searchClasses.INPUT}`) as HTMLInputElement;
//     const value: string = inputElem.value.trim();
//     const hasCategory = categories.find((item) => value === item);
//     localStorage.setItem('searchValue', value);

//     if (value === '') {
//       viewAllValue();
//     } else if (hasCategory) {
//       viewCategory(value);
//     } else {
//       viewSearchValue(value);
//     }
//   };

//   const getFromLocal = (): void => {
//     const input = document.querySelector(`.${searchClasses.INPUT}`) as HTMLInputElement;
//     const value = localStorage.getItem('searchValue') ?? '';
//     input.value = value;
//   };
// };

export { Search };
