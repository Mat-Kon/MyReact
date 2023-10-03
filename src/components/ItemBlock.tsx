import { IFilm, IPeople, IPlanet, ISpecies, IStarShips, IVehicles } from '../types/types';
import { resultClasses } from './Results';

type ItemProps = {
  item: IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips;
};

const ItemBlock: React.FC<ItemProps> = ({ item }) => {
  return (
    <div className="result__item-wrapper">
      <div className={resultClasses.ITEM}>
        {Object.entries(item).map((value) => (
          <>
            <h2 className={resultClasses.NAME}>{value[0]}</h2>
            <p className={resultClasses.VALUE}>{value[1]}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export { ItemBlock };
