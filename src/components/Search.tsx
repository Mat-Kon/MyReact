import { Component, FormEvent, ReactNode } from 'react';
import Loader from './Loader';
import { Item, ItemBlockListState } from '../types/types';
import { Api } from '../api/api';
import Form from './Form';
import Results from './Results';

type SearchProps = unknown;

class Search extends Component<SearchProps, ItemBlockListState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
    };
  }

  componentDidMount(): void {
    const value = localStorage.getItem('searchValue') ?? '';
    if (value) {
      this.searchItem(value);
    } else {
      this.getAllItems();
    }
  }

  handlerSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const value = localStorage.getItem('searchValue') ?? '';
    if (value === '') {
      this.getAllItems();
    } else {
      this.searchItem(value);
    }
  };

  getAllItems = async (): Promise<void> => {
    try {
      this.setState({ isLoading: true });
      const items: Item[] = await new Api().getAll();
      this.setState({ items: items });
    } catch (error) {
      console.error(`Error in ItemsBlockList`);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  searchItem = async (value: string) => {
    try {
      this.setState({ isLoading: true });
      const items = await new Api().getSearchItems(value);
      this.setState({ items: items });
    } catch (error) {
      console.error(`Error in Search component${error}`);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render(): ReactNode {
    const { items, isLoading } = this.state;
    return (
      <>
        <div className="search">
          <h1 className="heading">Star Wars Searching</h1>
          <Loader isLoading={isLoading} />
          <Form handlerSubmitForm={this.handlerSubmitForm} isLoading={isLoading} />
        </div>
        <Results items={items} />
      </>
    );
  }
}

export default Search;
