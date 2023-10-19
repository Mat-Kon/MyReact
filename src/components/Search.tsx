import { Component, FormEvent, ReactNode } from 'react';
import Loader from './Loader';
import { Item, ItemBlockListState } from '../types/types';
import { Api } from '../api/api';
import ErrorBtn from './ErrorBtn';
import Form from './Form';
import Results from './Results';

type SearchProps = unknown;

class Search extends Component<SearchProps, ItemBlockListState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      isError: false,
    };
  }

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

  handlerSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({ isError: false });
    this.getItems();
  };

  getItems = (): void => {
    const value = localStorage.getItem('searchValue') ?? '';
    console.log(value);
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
      this.setState({ items: items });
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
    const regValue: RegExp = new RegExp(value, 'i');
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
    const { items, isLoading, isError } = this.state;
    return (
      <>
        <div className="search">
          <h1 className="heading">Star Wars Searching</h1>
          <Loader isLoading={isLoading} />
          <Form handlerSubmitForm={this.handlerSubmitForm} isLoading={isLoading} />
          <ErrorBtn handleError={this.handleError} />
        </div>
        <Results items={items} isError={isError} />
      </>
    );
  }
}

export default Search;
