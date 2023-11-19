import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import { IContext } from '../types/types';
import data from '../mock/mockResultData.json';
import fetchMock from 'jest-fetch-mock';
import Detail from '../components/Detail';
import mockPeople from '../mock/mockPeopleData.json';
import Results from '../components/Results';

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
            <Route path="search-page/:page" element={<Results />} />
            <Route path="search-page/:page/:name" element={children} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('Detail', () => {
  beforeEach(() => {
    fetchMock.mockOnceIf('https://swapi.dev/api/people?search=Luke%20Skywalker', () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify(mockPeople),
      })
    );
  });

  it('It show that a loading indicator is displayed while fetching data', async () => {
    renderer(<Detail />, { route: 'search-page/1/Luke%20Skywalker' }, 2);

    const loader = screen.queryByTestId('loader');
    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      expect(loader).not.toBeInTheDocument();
    });
  });

  it('it show sure the detailed card component correctly displays the detailed card data', async () => {
    renderer(<Detail />, { route: 'search-page/1/Luke%20Skywalker' }, 2);

    await waitFor(async () => {
      const detail = await screen.findByTestId('detail');
      expect(detail).toBeInTheDocument();
    });

    const name = screen.getByText('Luke Skywalker');
    const height = screen.getByText('172');
    const mass = screen.getByText('77');
    const hairColor = screen.getByText('blond');
    const skinColor = screen.getByText('fair');

    expect(name).toBeInTheDocument();
    expect(height).toBeInTheDocument();
    expect(mass).toBeInTheDocument();
    expect(hairColor).toBeInTheDocument();
    expect(skinColor).toBeInTheDocument();
  });

  it('it show Ensure that clicking the close button hides the component', async () => {
    renderer(<Detail />, { route: 'search-page/1/Luke%20Skywalker' }, 2);

    const detail = await screen.findByTestId('detail');
    expect(detail).toBeInTheDocument();

    const closeBtn = screen.getByText('Close');
    fireEvent.click(closeBtn);
    expect(detail).not.toBeInTheDocument();
  });
});
