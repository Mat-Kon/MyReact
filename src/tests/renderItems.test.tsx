import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../components/App';

describe('Render items', () => {
  test('render 10 items in first load', async () => {
    render(<App />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('10');

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
  });

  test('set the display of 5 elements', async () => {
    const user = userEvent.setup();

    render(<App />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('10');
    await user.selectOptions(select, '5');

    const loader = await screen.findByTestId('loader');
    expect(loader).not.toBeNull();

    await waitFor(
      async () => {
        const results = await screen.findByTestId('results__wrapper');
        expect(results).toBeInTheDocument();
        const items = await screen.findAllByTestId('item');
        expect(items).toHaveLength(5);
      },
      { timeout: 8000 }
    );
  });

  test('set the display of 2 elements', async () => {
    const user = userEvent.setup();

    render(<App />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('10');
    await user.selectOptions(select, '2');

    const loader = await screen.findByTestId('loader');
    expect(loader).not.toBeNull();

    await waitFor(
      async () => {
        const results = await screen.findByTestId('results__wrapper');
        expect(results).toBeInTheDocument();
        const items = await screen.findAllByTestId('item');
        expect(items).toHaveLength(2);
      },
      { timeout: 8000 }
    );
  });
});
