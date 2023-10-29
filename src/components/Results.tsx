import { Items } from '../types/types';
import ItemsBlockList from './ItemsBlockList';

type Props = {
  items: Items | null;
};

const Results: React.FC<Props> = ({ items }) => {
  return (
    <div className="results">
      <div className="results__wrapper">
        <ItemsBlockList items={items} />
      </div>
    </div>
  );
};

export default Results;
