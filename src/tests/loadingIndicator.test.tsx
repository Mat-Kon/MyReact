import { render, waitFor, screen } from '@testing-library/react';
import App from '../components/App';
import userEvent from '@testing-library/user-event';

describe('Loading indicator', () => {
  test('it show that a loading indicator is displayed while fetching data for all cards', async () => {
    const user = userEvent.setup();
    render(<App />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();

    await waitFor(
      async () => {
        const results = await screen.findByTestId('results__wrapper');
        expect(results).toBeInTheDocument();
        const items = await screen.findAllByTestId('item');
        expect(items).toHaveLength(10);
        expect(loader).not.toBeInTheDocument();
      },
      { timeout: 8000 }
    );
  });

  test('it show that a loading indicator is displayed while fetching data for detail', async () => {
    const user = userEvent.setup();
    render(<App />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();

    await waitFor(
      async () => {
        const results = await screen.findByTestId('results__wrapper');
        expect(results).toBeInTheDocument();
        const items = await screen.findAllByTestId('item');
        expect(items).toHaveLength(10);
        expect(loader).not.toBeInTheDocument();
      },
      { timeout: 8000 }
    );

    const card = screen.getByText('Luke Skywalker');
    await user.click(card);

    await waitFor(async () => {
      const loader = await screen.findByTestId('loader');
      expect(loader).toBeInTheDocument();
    });
  });
});
