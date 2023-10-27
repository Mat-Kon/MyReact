import { Item } from '../types/types';
import ItemsBlockList from './ItemsBlockList';
import Pagination from './Pagination';

type Props = {
  items: Item[] | null;
};

const Results: React.FC<Props> = ({ items }) => {
  return (
    <div className="results">
      <div className="results__wrapper">
        <ItemsBlockList items={items} />
      </div>
      {items !== null && items?.length > 0 && items?.length <= 10 ? <Pagination /> : null}
    </div>
  );
};

export default Results;
