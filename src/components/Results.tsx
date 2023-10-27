import { Item } from '../types/types';
import ItemsBlockList from './ItemsBlockList';
import Pagination from './Pagination';

type Props = {
  items: Item[] | null;
  page: number;
};

const Results: React.FC<Props> = ({ items, page }) => {
  return (
    <div className="results">
      <div className="results__wrapper">
        <ItemsBlockList items={items} />
      </div>
      {items && items.length !== 0 ? <Pagination page={page} /> : null}
    </div>
  );
};

export default Results;
