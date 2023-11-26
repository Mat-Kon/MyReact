import ItemBlock from './ItemBlock';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { toggleDetail } from '../store/detailSlice';
import { IPeople } from '../types/types';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const ItemsBlokList: React.FC = () => {
  const { pageNum } = useParams();
  const dispatch = useAppDispatch();
  const items = useAppSelector((store) => store.items);

  if (items.length > 0 && pageNum) {
    return items.map((item: IPeople) => (
      <Link
        href={`${pageNum}/${item.name}`}
        key={item.created}
        className="result__item-wrapper"
        onClick={() => dispatch(toggleDetail())}
      >
        <ItemBlock item={item} />
      </Link>
    ));
  }
  return <p className="not-found">not found</p>;
};

export default ItemsBlokList;
