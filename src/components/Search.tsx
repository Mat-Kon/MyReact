import { Component, ReactNode } from 'react';
import { Loader } from './Loader';
import ItemsBlokList from './ItemsBlockList';

type Text = {
  text: string;
};

class Search extends Component<Text, { text: string }> {
  constructor(props: Text) {
    super(props);
    this.state = { text: localStorage.getItem('searchValue') ?? '' };
  }

  handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ text: value });
    localStorage.setItem('searchValue', value);
  };

  render(): ReactNode {
    const { text } = this.state;
    return (
      <>
        <div className="search">
          <h1 className="heading">Star Wars Searching</h1>
          <Loader />
          <form className="search__form" action="search">
            <input
              className="search__input"
              type="text"
              value={text}
              onChange={this.handlerInputChange}
            />
            <input className="search__btn" type="submit" value="Search" />
          </form>
        </div>
        <div className="results">
          <div className="results__wrapper">{<ItemsBlokList items={[]} value={text} />}</div>
        </div>
      </>
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
