import { Component, ReactNode } from 'react';
import { Item } from '../types/types';
import ItemsBlockList from './ItemsBlockList';

type Props = {
  items: Item[] | null;
};

class Results extends Component<Props> {
  render(): ReactNode {
    const { items } = this.props;
    return (
      <div className="results">
        <div className="results__wrapper">
          <ItemsBlockList items={items} />
        </div>
      </div>
    );
  }
}

export default Results;
