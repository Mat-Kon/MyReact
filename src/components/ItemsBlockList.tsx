import ItemBlock from './ItemBlock';
import { IContext, ItemBlockListProps } from '../types/types';
import { Link, useOutlet, useOutletContext, useParams } from 'react-router-dom';
import { useContext } from 'react';

const ItemsBlokList: React.FC<ItemBlockListProps> = ({ items }) => {
  const { page } = useParams();
  const { setLoading } = useOutletContext<IContext>();

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
