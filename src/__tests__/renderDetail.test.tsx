import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../components/App';
import userEvent from '@testing-library/user-event';

describe('Test open detail', () => {
  test('it show sure the detailed card component correctly displays the detailed card data', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(
      async () => {
        const results = await screen.findByTestId('results__wrapper');
        expect(results).toBeInTheDocument();
        const items = await screen.findAllByTestId('item');
        expect(items).toHaveLength(10);
      },
      { timeout: 8000 }
    );

    const card = screen.getByText('Luke Skywalker');

    await user.click(card);

    await waitFor(
      async () => {
        const detail = await screen.findByTestId('detail');
        expect(detail).toBeInTheDocument();
      },
      { timeout: 8000 }
    );

    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByText('mass')).toBeInTheDocument();
    expect(screen.getByText('hair_color')).toBeInTheDocument();
    expect(screen.getByText('skin_color')).toBeInTheDocument();
    expect(screen.getByText('eye_color')).toBeInTheDocument();
    expect(screen.getByText('birth_year')).toBeInTheDocument();
  });
});
