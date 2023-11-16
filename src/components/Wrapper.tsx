import Search from './Search';
import { MouseEvent, createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { IContext, IQuantity } from '../types/types';
import { useAppDispatch } from '../hooks/reduxHooks';
import { toggleDetail } from '../store/detailSlice';

const Quantity = createContext<IQuantity>({ setQuantity: null });

const Wrapper: React.FC = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(10);
  const dispatch = useAppDispatch();

  const context: IContext = {
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
    <Quantity.Provider value={{ setQuantity }}>
      <div className="wrapper" onClick={handlerClick}>
        <Search />
        <Outlet context={context} />
      </div>
    </Quantity.Provider>
  );
};

export default Wrapper;
export { Quantity };
