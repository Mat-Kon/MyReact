import { Component, ReactNode } from 'react';
import { Item } from '../types/types';
import ItemsBlockList from './ItemsBlockList';

type Props = {
  items: Item[] | null;
  isError: boolean;
};

class Results extends Component<Props> {
  render(): ReactNode {
    const { items, isError } = this.props;
    return (
      <div className="results">
        <div className="results__wrapper">
          {isError ? (
            <p className="error-message">You caused a mistake, now the empire will fall!</p>
          ) : (
            <ItemsBlockList items={items} />
          )}
        </div>
      </div>
    );
  }
}

export default Results;
