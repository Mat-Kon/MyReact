import ItemBlock from './ItemBlock';
import { ItemBlockListProps } from '../types/types';

const ItemsBlokList: React.FC<ItemBlockListProps> = ({ items }) => {
  return items ? (
    items.map((item) => <ItemBlock key={item.created} item={item} />)
  ) : (
    <p className="not-found">not found</p>
  );
};

export default ItemsBlokList;
