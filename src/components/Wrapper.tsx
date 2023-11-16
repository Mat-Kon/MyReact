import Search from './Search';
import { MouseEvent, createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { IContext, ILoading, IQuantity } from '../types/types';
import { useAppDispatch } from '../hooks/reduxHooks';
import { toggleDetail } from '../store/detailSlice';

const IsLoading = createContext<ILoading>({ isLoading: false, setLoading: null });
const Quantity = createContext<IQuantity>({ setQuantity: null });

const Wrapper: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(10);
  const dispatch = useAppDispatch();

  const context: IContext = {
    isLoading,
    setLoading,
    quantity,
  };

  useEffect(() => {
    navigate('/search-page/1');
  }, []);

  const handlerClick = (e: MouseEvent) => {
    const targElem = e.target as HTMLElement;
    if (
      targElem.className === 'results' ||
      targElem.className === 'wrapper' ||
      targElem.className === 'search'
    ) {
      dispatch(toggleDetail());
      navigate('/search-page/1');
    }
  };

  return (
    <IsLoading.Provider value={{ isLoading, setLoading }}>
      <Quantity.Provider value={{ setQuantity }}>
        <div className="wrapper" onClick={handlerClick}>
          <Search />
          <Outlet context={context} />
        </div>
      </Quantity.Provider>
    </IsLoading.Provider>
  );
};

export default Wrapper;
export { IsLoading, Quantity };
