import { useEffect, useState } from 'react';
import { IPeople } from '../types/types';
import { useNavigate, useParams } from 'react-router';
import { useGetByNameQuery } from '../api/api';
import { useAppDispatch } from '../hooks/reduxHooks';
import { toggleDetail } from '../store/detailSlice';
import Loader from './Loader';

const Detail: React.FC = () => {
  const [curItem, setCurItem] = useState<IPeople | null>(null);
  const { page, name } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetByNameQuery(name!);
  const dispatch = useAppDispatch();

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
    navigate(`/search-page/${page}`);
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
