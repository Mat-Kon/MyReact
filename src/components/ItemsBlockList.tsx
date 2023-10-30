import ItemBlock from './ItemBlock';
import { ItemBlockListProps } from '../types/types';
import { Link, useParams } from 'react-router-dom';

const ItemsBlokList: React.FC<ItemBlockListProps> = ({ items }) => {
  const { pageNumber } = useParams();
  return items ? (
    items.map((item) => (
      <Link to={`${pageNumber}/${item.name}`} key={item.created} className="result__item-wrapper">
        <ItemBlock item={item} />
      </Link>
    ))
  ) : (
    <p className="not-found">not found</p>
  );
};

export default ItemsBlokList;
