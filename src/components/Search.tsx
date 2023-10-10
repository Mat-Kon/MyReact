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

export default Search;
