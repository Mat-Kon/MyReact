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
            <Route path="search-page/:page" element={<Results />}>
              <Route path=":name" element={children} />
            </Route>
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('Results', () => {
  beforeEach(() => {
    fetchMock.mockOnceIf('https://swapi.dev/api/people?page=1', () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify(data),
      })
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('it show that a loading indicator is displayed while fetching data', async () => {
    renderer(<Results />, { route: 'search-page/1' }, 10);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      expect(loader).not.toBeInTheDocument();
    });
  });

  it('It show that the component renders the specified number of cards (10)', async () => {
    renderer(<Results />, { route: 'search-page/1' }, 10);

    await waitFor(async () => {
      const items = await screen.findAllByTestId('item');
      expect(items).toHaveLength(10);
    });
  });

  it('It show that the component renders the specified number of cards (5)', async () => {
    renderer(<Results />, { route: 'search-page/1' }, 5);

    await waitFor(async () => {
      const items = await screen.findAllByTestId('item');
      expect(items).toHaveLength(5);
    });
  });

  it('It show that an appropriate message is displayed if no cards are present', async () => {
    renderer(<Results />, { route: 'search-page/1' }, 0);

    await waitFor(async () => {
      const message = await screen.queryByText('not found');
      expect(message).toBeInTheDocument();
    });
  });

  it('It show that clicking on a card opens a detailed card component', async () => {
    renderer(<Detail />, { route: 'search-page/1' }, 2);

    await waitFor(async () => {
      const card = await screen.findByText('Luke Skywalker');
      fireEvent.click(card);
    });

    await waitFor(async () => {
      const detail = await screen.findByTestId('detail');
      expect(detail).toBeInTheDocument();
    });
  });
});
