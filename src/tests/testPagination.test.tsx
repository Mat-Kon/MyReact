import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../components/App';

describe('Pagination', () => {
  test('it show that pagination is render', async () => {
    const user = userEvent.setup();
    render(<App />);

    const loader = await screen.findByTestId('loader');
    expect(loader).not.toBeNull();

    await waitFor(
      async () => {
        const results = await screen.findByTestId('results__wrapper');
        expect(results).toBeInTheDocument();
        const items = await screen.findAllByTestId('item');
        expect(items).toHaveLength(10);
      },
      { timeout: 8000 }
    );

    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
  });

  test('it show that pagination is change URL', async () => {
    const user = userEvent.setup();
    render(<App />);

    const loader = await screen.findByTestId('loader');
    expect(loader).not.toBeNull();

    await waitFor(
      async () => {
        const results = await screen.findByTestId('results__wrapper');
        expect(results).toBeInTheDocument();
        const items = await screen.findAllByTestId('item');
        expect(items).toHaveLength(10);
      },
      { timeout: 8000 }
    );

    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
    expect(window.location.pathname).toBe('/search-page/1');

    const nextBtn = await screen.findByTestId('next');
    await user.click(nextBtn);
    expect(window.location.pathname).toBe('/search-page/2');
  });
});
