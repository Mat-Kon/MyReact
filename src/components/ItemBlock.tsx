import React from 'react';
import { Item } from '../types/types';

type ItemProps = {
  item: Item;
};

const ItemBlock: React.FC<ItemProps> = ({ item }) => {
  return (
    <div className="result__item-wrapper">
      <div className="result__item">
        {Object.entries(item!).map((value, index) => {
          if (index < 2) {
            return (
              <div className="item" key={index}>
                <h2 className="item__name">{value[0]}</h2>
                <p className="item__value">
                  {Array.isArray(value[1])
                    ? (value[1] as string[]).map((value) => value + '\n')
                    : String(value[1])}
                </p>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ItemBlock;
