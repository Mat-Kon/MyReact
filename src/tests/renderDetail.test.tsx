import { render, waitFor, screen } from '@testing-library/react';
import App from '../components/App';
import userEvent from '@testing-library/user-event';

describe('Test open detail', () => {
  test('it show that clicking on a card opens a detailed card component', async () => {
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
  });
});
