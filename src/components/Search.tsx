import { Component, ReactNode } from 'react';
import Loader from './Loader';
import { Item, ItemBlockListState } from '../types/types';
import { Api } from '../api/api';
import ItemsBlockList from './ItemsBlockList';
import ErrorBtn from './ErrorBtn';

type SearchProps = unknown;

class Search extends Component<SearchProps, ItemBlockListState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      items: [],
      value: localStorage.getItem('searchValue') ?? '',
      isLoading: false,
      isError: false,
    };
  }

  handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    this.setState({ value });
    localStorage.setItem('searchValue', value);
  };

  componentDidMount(): void {
    this.getItems();
    window.addEventListener('error', this.handleError);
  }

  handleError = () => {
    this.setState({ isError: true, isLoading: false });
  };

  getError = () => {
    throw new Error('You caused is Error');
  };

  handlerSearchBtn = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    this.setState({ isError: false });
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
      console.error(`Error in getFilterItems`);
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
    const { value, items, isLoading, isError } = this.state;
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
            <button className="search__btn" onClick={this.handlerSearchBtn} disabled={isLoading}>
              Search
            </button>
          </form>
          <ErrorBtn handleError={this.handleError} />
        </div>
        <div className="results">
          <div className="results__wrapper">
            {isError ? (
              <p className="error-message">You caused a mistake, now the empire will fall!</p>
            ) : (
              <ItemsBlockList items={items} />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Search;
