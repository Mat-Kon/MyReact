import React, { useEffect } from 'react';
import Results from '../../src/components/Results';
import { wrapper } from '../../src/store/store';
import { getItems, getRunningQueriesThunk } from '../../src/api/api';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../src/hooks/reduxHooks';
import { setRouted } from '../../src/store/routerSlice';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const pageNum = context.params?.pageNum;
  if (typeof pageNum === 'string') {
    store.dispatch(getItems.initiate(pageNum));
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return {
    props: {},
  };
});

const ResultPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    toggleLoading();
  });

  const toggleLoading = () => {
    router.events.on('routeChangeStart', () => dispatch(setRouted(true)));
    router.events.on('routeChangeError', () => dispatch(setRouted(false)));
    router.events.on('routeChangeComplete', () => dispatch(setRouted(false)));
  };

  return <Results />;
};

export default ResultPage;
