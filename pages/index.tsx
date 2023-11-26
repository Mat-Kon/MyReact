import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/search-page/1');
  });
  return null;
};

export default Home;
