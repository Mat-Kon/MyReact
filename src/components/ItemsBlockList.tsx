import { Component, ReactNode } from 'react';
import { IFilm, IPeople, IPlanet, ISpecies, IStarShips, IVehicles } from '../types/types';
import { ItemBlock } from './ItemBlock';

type ItemBlockListProps = {
  items: (IPlanet | IFilm | ISpecies | IVehicles | IStarShips | IPeople)[];
};

class ItemsBlokList extends Component<ItemBlockListProps> {
  constructor(props: Readonly<ItemBlockListProps>) {
    super(props);
  }

  render(): ReactNode {
    const { items } = this.props;

    return (
      <div className="result__item-wrapper">
        {items.map((item, index) => (
          <ItemBlock key={index} item={item} />
        ))}
      </div>
    );
  }
}

export default ItemsBlokList;
