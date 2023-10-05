import { Component, ReactNode } from 'react';
import ItemsBlokList from './ItemsBlockList';

class Results extends Component {
  render(): ReactNode {
    return (
      <div className="results">
        <div className="results__wrapper">{<ItemsBlokList items={[]} />}</div>
      </div>
    );
  }
}

export { Results };
