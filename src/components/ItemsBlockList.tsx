import ItemBlock from './ItemBlock';
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { toggleDetail } from '../store/detailSlice';

const ItemsBlokList: React.FC = () => {
  const { page } = useParams();
  const dispatch = useAppDispatch();
  const items = useAppSelector((store) => store.items);

  if (items.length > 0 && page) {
    return items.map((item) => (
      <NavLink
        to={`${item.name}`}
        key={item.created}
        className="result__item-wrapper"
        onClick={() => dispatch(toggleDetail())}
      >
        <ItemBlock item={item} />
      </NavLink>
    ));
  }
  return <p className="not-found">not found</p>;
};

export default ItemsBlokList;
