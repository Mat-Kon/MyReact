import { useContext, useEffect, useState } from 'react';
import { IPeople } from '../types/types';
import { useParams } from 'react-router';
import { Api } from '../api/api';
import { IsLoading } from './Wrapper';

const Detail: React.FC = () => {
  const [curItem, setCurItem] = useState<IPeople | null>(null);
  const { name } = useParams();
  const { isLoading, setLoading } = useContext(IsLoading);

  useEffect(() => {
    if (name) {
      getItem(name);
    }
  }, [name]);

  const getItem = async (value: string) => {
    const item = await new Api().getItemByName(value);
    setCurItem(item);
    if (setLoading) setLoading((prev) => !prev);
  };

  if (curItem) {
    return isLoading ? null : (
      <div className="detail">
        <div className="detail__wrapper">
          {Object.entries(curItem).map((value, index) => {
            return (
              <div className="detail-item" key={index}>
                <h2 className="detail__name">{value[0]}</h2>
                <p className="detail__value">
                  {Array.isArray(value[1])
                    ? (value[1] as string[]).map((value) => value + '\n')
                    : String(value[1])}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    null;
  }
};

export default Detail;
