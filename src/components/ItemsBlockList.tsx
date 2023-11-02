import ItemBlock from './ItemBlock';
import { ItemBlockListProps } from '../types/types';
import { Link, useParams } from 'react-router-dom';

const ItemsBlokList: React.FC<ItemBlockListProps> = ({ items }) => {
  const page = useParams();
  return items.length > 0 && page
    ? items.map((item) => (
        <Link
          to={`search-page/${page}/${item.name}`}
          key={item.created}
          className="result__item-wrapper"
        >
          <ItemBlock item={item} />
        </Link>
      ))
    : null;
};

export default ItemsBlokList;
