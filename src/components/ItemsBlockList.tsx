import ItemBlock from './ItemBlock';
import { IContext } from '../types/types';
import { NavLink, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ItemsContext } from './Results';
import { useOutletContext } from 'react-router';

const ItemsBlokList: React.FC = () => {
  const { page } = useParams();
  const { setDetail } = useOutletContext<IContext>();
  const { items } = useContext(ItemsContext);

  const handlerClick = () => {
    setDetail(true);
  };

  return items.length > 0 && page
    ? items.map((item) => (
        <NavLink
          to={`${item.name}`}
          key={item.created}
          className="result__item-wrapper"
          onClick={handlerClick}
        >
          <ItemBlock item={item} />
        </NavLink>
      ))
    : null;
};

export default ItemsBlokList;
