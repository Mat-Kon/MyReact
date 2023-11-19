import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router';
import Wrapper from '../components/Wrapper';
import Results from '../components/Results';
import Detail from '../components/Detail';
import NotFoundPage from '../components/NotFoundPage';

const renderer = (children: React.ReactElement, { route }: { route: string }) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/${route}`]}>
        <Routes>
          <Route path="/" element={<Wrapper />}>
            <Route index element={<Results />} />
            <Route path="search-page" element={<Navigate to="search-page/1" replace />} />
            <Route path="search-page/:page" element={<Results />}>
              <Route path=":name" element={<Detail />} />
            </Route>
            <Route path="*" element={children} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('NotFoundPage', () => {
  it('It show', () => {
    renderer(<NotFoundPage />, { route: 'asdasdas' });
    const message = screen.getByText('Page is not found');
    screen.debug();
    expect(message).toBeInTheDocument();
  });
});
