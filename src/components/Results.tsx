import { Component, ReactNode } from 'react';
import { Items } from '../types/types';
import ItemsBlockList from './ItemsBlockList';
import Pagination from './Pagination';

type Props = {
  items: Items | null;
};

class Results extends Component<Props> {
  render(): ReactNode {
    const { items } = this.props;
    return (
      <div className="results">
        <div className="results__wrapper">
          <ItemsBlockList items={items} />
        </div>
        {items !== null && items?.length > 0 && items?.length <= 10 ? <Pagination /> : null}
      </div>
    );
  }
}

export default Results;
