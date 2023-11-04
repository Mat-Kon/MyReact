import ItemBlock from './ItemBlock';
import { IContext, ItemBlockListProps } from '../types/types';
import { NavLink, useOutletContext, useParams } from 'react-router-dom';

const ItemsBlokList: React.FC<ItemBlockListProps> = ({ items }) => {
  const { page } = useParams();
  const { setDetail } = useOutletContext<IContext>();

  const setActive = ({ isActive }: { isActive: boolean }) => {
    return isActive ? 'result__item-wrapper active' : 'result__item-wrapper';
  };

  const handlerClick = () => {
    setDetail(true);
  };

  return items.length > 0 && page
    ? items.map((item) => (
        <NavLink
          end
          to={`${item.name}`}
          key={item.created}
          className={setActive}
          onClick={handlerClick}
        >
          <ItemBlock item={item} />
        </NavLink>
      ))
    : null;
};

export default ItemsBlokList;
