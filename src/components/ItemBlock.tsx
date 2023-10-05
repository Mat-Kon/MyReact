import { IFilm, IPeople, IPlanet, ISpecies, IStarShips, IVehicles } from '../types/types';

type ItemProps = {
  item: IPeople | IPlanet | IFilm | ISpecies | IVehicles | IStarShips;
};

const ItemBlock: React.FC<ItemProps> = ({ item }) => {
  return (
    <div className="result__item-wrapper">
      <div className="result__item">
        {Object.entries(item).map((value) => (
          <>
            <h2 className="item__name">{value[0]}</h2>
            <p className="item__value">{value[1]}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export { ItemBlock };
