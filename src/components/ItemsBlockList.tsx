import { Component, ReactNode } from 'react';
import { ItemBlock } from './ItemBlock';
import { Api } from '../api/api';
import { ItemBlockList, ItemBlockListProps } from '../types/types';

class ItemsBlokList extends Component<ItemBlockListProps, { items: ItemBlockList }> {
  constructor(props: Readonly<ItemBlockListProps>) {
    super(props);
    this.state = { items: [] };
  }

  async componentDidMount(): Promise<void> {
    try {
      const items: ItemBlockList = await new Api().getAll();
      this.setState({ items });
    } catch (error) {
      console.error(`Error in ItemsBlockList`);
    }
  }

  render(): ReactNode {
    const { items } = this.state;

    return (
      <>
        {items.map((item, index) => (
          <ItemBlock key={index} item={item} />
        ))}
      </>
    );
  }
}

export default ItemsBlokList;
