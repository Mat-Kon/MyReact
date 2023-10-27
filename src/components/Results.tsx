import { MouseEventHandler } from 'react';
import { Items } from '../types/types';
import ItemsBlockList from './ItemsBlockList';
import Pagination from './Pagination';

type Props = {
  items: Items | null;
  page: number;
  nextPage: MouseEventHandler<HTMLDivElement>;
};

const Results: React.FC<Props> = ({ items, page, nextPage }) => {
  return (
    <div className="results">
      <div className="results__wrapper">
        <ItemsBlockList items={items} />
      </div>
      {items && items.length !== 0 ? <Pagination page={page} nextPage={nextPage} /> : null}
    </div>
  );
};

export default Results;
