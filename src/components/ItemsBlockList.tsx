import ItemBlock from './ItemBlock';
import { IContext, ItemBlockListProps } from '../types/types';
import { NavLink, useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { MouseEvent, useState } from 'react';

const ItemsBlokList: React.FC<ItemBlockListProps> = ({ items }) => {
  const navigate = useNavigate();
  const { page } = useParams();
  const { setDetail } = useOutletContext<IContext>();
  const [setName] = useState('');

  const setActive = ({ isActive }: { isActive: boolean }) => {
    return isActive ? 'result__item-wrapper active' : 'result__item-wrapper';
  };

  const handlerClick = (e: MouseEvent, name: string) => {
    const elem = e.currentTarget;
    const isActive = elem.classList.contains('active');
    if (isActive) {
      elem.classList.remove('active');
      setDetail(false);
      navigate('/');
    } else {
      setDetail(true);
    }
  };

  return items.length > 0 && page
    ? items.map((item) => (
        <NavLink
          end
          to={`${item.name}`}
          key={item.created}
          className={setActive}
          onClick={(e) => handlerClick(e, item.name)}
        >
          <ItemBlock item={item} />
        </NavLink>
      ))
    : null;
};

export default ItemsBlokList;
