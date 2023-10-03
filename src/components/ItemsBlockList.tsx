import { IFilm, IPeople, IPlanet, ISpecies, IStarShips, IVehicles } from '../types/types';
import { ItemBlock } from './ItemBlock';
import { resultClasses } from './Results';

type props = {
  items: (IPlanet | IFilm | ISpecies | IVehicles | IStarShips | IPeople)[];
};

const ItemsBlokList: React.FC<props> = ({ items }) => {
  return (
    <div className={resultClasses.WRAPPER}>
      {items.map((item) => (
        <>
          <ItemBlock item={item} />
        </>
      ))}
    </div>
  );
};

export default ItemsBlokList;
