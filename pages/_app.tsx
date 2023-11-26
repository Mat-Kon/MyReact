import React from 'react';
import '../src/sass/main.scss';
import type { AppProps } from 'next/app';
import ErrorBoundary from '../src/components/ErrorBoundary';
import { wrapper } from '../src/store/store';
import Wrapper from '../src/components/Wrapper';
import { Provider } from 'react-redux';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Wrapper>
          <Component {...props.pageProps} />
        </Wrapper>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
