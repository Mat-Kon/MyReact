import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../components/App';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('Test close detail', () => {
  test('it show that detailed card is close after clicking on the Close button', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

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
        const detail = screen.getByTestId('detail');
        expect(detail).toBeInTheDocument();
      },
      { timeout: 8000 }
    );

    const closeBtn = screen.getByText('Close');
    await user.click(closeBtn);

    const detail = screen.queryByTestId('detail');
    expect(detail).not.toBeInTheDocument();
  });
});
