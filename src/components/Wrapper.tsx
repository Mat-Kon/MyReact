import Search from './Search';
import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { toggleDetail } from '../store/detailSlice';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';

const Wrapper: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [curPage, setCurPage] = useState('');
  const router = useRouter();
  const params = useParams();
  const isOpen = useAppSelector((store) => store.detail.isOpen);

  useEffect(() => {
    if (params) {
      setCurPage(params.pageNum as string);
    }
  }, [params]);

  const handlerClick = (e: MouseEvent) => {
    const targElem = e.target as HTMLElement;
    if (isOpen) {
      if (
        targElem.className === 'results' ||
        targElem.className === 'wrapper' ||
        targElem.className === 'search'
      ) {
        dispatch(toggleDetail());
        router.push(`/search-page/${curPage}`);
      }
    }
  };

  return (
    <div className="wrapper" onClick={handlerClick}>
      <Search />
      {children}
    </div>
  );
};

export default Wrapper;
