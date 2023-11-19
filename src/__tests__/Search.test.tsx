import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Results from '../components/Results';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import { IContext } from '../types/types';
import data from '../mock/mockResultData.json';
import fetchMock from 'jest-fetch-mock';
import Detail from '../components/Detail';
import Search from '../components/Search';

fetchMock.enableMocks();

const renderer = (children: React.ReactElement, { route }: { route: string }, quantity: number) => {
  const context: IContext = {
    quantity,
  };

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/${route}`]}>
        <Routes>
          <Route path="/" element={<Outlet context={context} />}>
            <Route path="search-page/:page" element={children} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('Search', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('It show that clicking the Search button saves the entered value to the local storage', () => {
    renderer(<Search />, { route: 'search-page/1' }, 10);

    const input = screen.getByRole('textbox');
    const button = screen.getByText('Search');
    fireEvent.change(input, { target: { value: 'aaa' } });
    fireEvent.click(button);
    expect(window.localStorage.getItem('searchValue')).toBe('aaa');
  });

  it('It show that that the component retrieves the value from the local storage upon mounting', () => {
    const value = 'bbbb';
    window.localStorage.setItem('searchValue', value);
    renderer(<Search />, { route: 'search-page/1' }, 10);

    const input = screen.getByRole('textbox');
    expect(input.closest('input')?.value).toBe(value);
  });
});
