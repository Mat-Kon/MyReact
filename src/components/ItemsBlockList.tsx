import ItemBlock from './ItemBlock';
import { IContext } from '../types/types';
import { NavLink, useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router';
import { useAppSelector } from '../hooks/hooks';

const ItemsBlokList: React.FC = () => {
  const { page } = useParams();
  const { setDetail } = useOutletContext<IContext>();
  const items = useAppSelector((store) => store.items);

  const handlerClick = () => {
    setDetail(true);
  };

  if (items.length > 0 && page) {
    return items.map((item) => (
      <NavLink
        to={`${item.name}`}
        key={item.created}
        className="result__item-wrapper"
        onClick={handlerClick}
      >
        <ItemBlock item={item} />
      </NavLink>
    ));
  }
  return <p className="not-found">not found</p>;
};

export default ItemsBlokList;
