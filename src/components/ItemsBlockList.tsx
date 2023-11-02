import ItemBlock from './ItemBlock';
import { ItemBlockListProps } from '../types/types';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { IsLoading } from './Wrapper';

const ItemsBlokList: React.FC<ItemBlockListProps> = ({ items }) => {
  const { page } = useParams();
  const { setLoading } = useContext(IsLoading);

  return items.length > 0 && page
    ? items.map((item) => (
        <Link
          to={`${item.name}`}
          key={item.created}
          className="result__item-wrapper"
          onClick={() => {
            if (setLoading) setLoading((prev) => !prev);
          }}
        >
          <ItemBlock item={item} />
        </Link>
      ))
    : null;
};

export default ItemsBlokList;
