import { Component, ReactNode } from 'react';
import ItemBlock from './ItemBlock';
import { ItemBlockListProps } from '../types/types';

class ItemsBlokList extends Component<ItemBlockListProps> {
  render(): ReactNode {
    const { items } = this.props;
    return items ? (
      items.map((item, index) => <ItemBlock key={index} item={item} />)
    ) : (
      <p className="not-found">not found</p>
    );
  }
}

export default ItemsBlokList;
