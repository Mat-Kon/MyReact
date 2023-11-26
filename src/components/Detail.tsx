import { useEffect, useState } from 'react';
import { IPeople } from '../types/types';
import { useGetByNameQuery } from '../api/api';
import { useAppDispatch } from '../hooks/reduxHooks';
import { toggleDetail } from '../store/detailSlice';
import Loader from './Loader';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';

const Detail: React.FC = () => {
  const [curItem, setCurItem] = useState<IPeople | null>(null);
  const { pageNum, name } = useParams();
  const { data, isLoading } = useGetByNameQuery(name as string);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (name) {
      getItem();
    }
  }, [name, data]);

  const getItem = () => {
    const item = data ? data.results[0] : null;
    setCurItem(item);
  };

  const handlerClick = () => {
    dispatch(toggleDetail());
    router.push(`/search-page/${pageNum}`);
  };

  return (
    <div className="detail" data-testid="detail">
      <button className="detail__close" onClick={handlerClick}>
        Close
      </button>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="detail__wrapper">
          {curItem
            ? Object.entries(curItem).map((value, index) => {
                return (
                  <div className="detail__item" key={index}>
                    <h2 className="detail__name">{value[0]}</h2>
                    <p className="detail__value">
                      {Array.isArray(value[1])
                        ? (value[1] as string[]).map((value) => value + '\n')
                        : String(value[1])}
                    </p>
                  </div>
                );
              })
            : null}
        </div>
      )}
    </div>
  );
};

export default Detail;
