import { useEffect, useState } from 'react';
import { IContext, IPeople } from '../types/types';
import { useNavigate, useOutletContext, useParams } from 'react-router';
import { Api } from '../api/api';

const Detail: React.FC = () => {
  const [curItem, setCurItem] = useState<IPeople | null>(null);
  const { page, name } = useParams();
  const { isLoading, setLoading, setDetail } = useOutletContext<IContext>();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (name) {
      getItem(name);
    }
  }, [name]);

  const getItem = async (value: string) => {
    const item = await new Api().getItemByName(value);
    setCurItem(item);
    setLoading(false);
  };

  const handlerClick = () => {
    setDetail(false);
    navigate(`/search-page/${page}`);
  };

  if (curItem) {
    return isLoading ? null : (
      <div className="detail">
        <button className="detail__close" onClick={handlerClick}>
          Close
        </button>
        <div className="detail__wrapper">
          {Object.entries(curItem).map((value, index) => {
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
          })}
        </div>
      </div>
    );
  }
};

export default Detail;
