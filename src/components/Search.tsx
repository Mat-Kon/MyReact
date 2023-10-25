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
    this.setState({ isLoading: true });
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
    const items: Item[] | undefined = await new Api().getAll();
    this.setState({ items: items });
    this.setState({ isLoading: false });
  };

  searchItem = async (value: string) => {
    let items = await new Api().getSearchItems(value);
    if (items && items.length > 0) {
      items = items.slice(0, 10);
      this.setState({ items: items });
    } else {
      this.setState({ items: null });
    }
    this.setState({ isLoading: false });
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
