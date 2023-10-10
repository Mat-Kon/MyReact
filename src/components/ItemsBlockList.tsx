import { Component, ReactNode } from 'react';
import ItemBlock from './ItemBlock';
import { Api } from '../api/api';
import { Item, ItemBlockListProps } from '../types/types';

class ItemsBlokList extends Component<ItemBlockListProps, { items: Item[] | null }> {
  constructor(props: Readonly<ItemBlockListProps>) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount = async (): Promise<void> => {
    const { value } = this.props;
    if (value !== '') {
      try {
        const items: Item[] = await new Api().getAll();
        const filterItems = this.filterItems(value, items);
        if (filterItems) {
          this.setState({ items: filterItems });
        } else {
          this.setState({ items: null });
        }
      } catch (error) {
        console.error(`Error in ItemsBlockList`);
      }
    } else {
      try {
        const items: Item[] = await new Api().getAll();
        this.setState({ items });
      } catch (error) {
        console.error(`Error in ItemsBlockList`);
      }
    }
  };

  filterItems = (value: string, items: Item[]): Item[] | null => {
    const regValue: RegExp = new RegExp(`\\b${value}\\b`, 'i');
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
    const { items } = this.state;
    return items ? (
      items.map((item, index) => <ItemBlock key={index} item={item} />)
    ) : (
      <p className="not-found">not found</p>
    );
  }
}

export default ItemsBlokList;
