import { Component, ReactNode } from 'react';
import Loader from './Loader';
import ItemsBlokList from './ItemsBlockList';
import { Item, ItemBlockListState } from '../types/types';
import { Api } from '../api/api';

type SearchProps = unknown;

class Search extends Component<SearchProps, ItemBlockListState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      items: [],
      value: localStorage.getItem('searchValue') ?? '',
      isLoading: false,
    };
  }

  handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    this.setState({ value });
    localStorage.setItem('searchValue', value);
  };

  componentDidMount(): void {
    this.getItems();
  }

  handlerSearchBtn = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    this.getItems();
  };

  getItems = (): void => {
    const { value } = this.state;
    this.setState({ isLoading: true });
    if (value !== '') {
      this.getFilterItems(value);
    } else {
      this.getAllItems();
    }
  };

  getAllItems = async (): Promise<void> => {
    try {
      const items: Item[] = await new Api().getAll();
      this.setState({ items });
    } catch (error) {
      console.error(`Error in ItemsBlockList`);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getFilterItems = async (value: string): Promise<void> => {
    try {
      const items: Item[] = await new Api().getAll();
      const filterItems = this.filterItems(value!, items);
      if (filterItems) {
        this.setState({ items: filterItems });
      } else {
        this.setState({ items: null });
      }
    } catch (error) {
      console.error(`Error in ItemsBlockList`);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  filterItems = (value: string, items: Item[]): Item[] | null => {
    const regValue: RegExp = new RegExp(`\\b${value}\\b`, 'i');
    const allItems = items;
    const result: Item[] = [];
    allItems.forEach((item: Item) => {
      const keys = Object.keys(item);
      const hasKeys = keys.filter((value) => regValue.test(value)).length > 0;
      const values = Object.values(item);
      const hasValues = values.filter((value) => regValue.test(value)).length > 0;
      if (hasKeys || hasValues) {
        result.push(item);
      }
    });
    if (result.length > 0) {
      return result.slice(0, 10);
    } else {
      return null;
    }
  };

  render(): ReactNode {
    const { value, items, isLoading } = this.state;
    return (
      <>
        <div className="search">
          <h1 className="heading">Star Wars Searching</h1>
          <Loader isLoading={isLoading} />
          <form className="search__form" action="search">
            <input
              className="search__input"
              type="text"
              value={value}
              onChange={this.handlerInputChange}
            />
            <button className="search__btn" onClick={this.handlerSearchBtn}>
              Search
            </button>
          </form>
        </div>
        <div className="results">
          <div className="results__wrapper">{<ItemsBlokList items={items} />}</div>
        </div>
      </>
    );
  }
}

export default Search;
