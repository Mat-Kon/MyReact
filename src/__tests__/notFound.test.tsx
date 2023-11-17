import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../components/App';
import { userEvent } from '@testing-library/user-event';

test('Checking the display of the message in the absence of cards', async () => {
  const user = userEvent.setup();
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

  const input = screen.getByRole('textbox');
  const button = screen.getByText('Search');

  expect(input).toHaveValue('');
  expect(button).toBeInTheDocument();

  await user.click(input);
  await user.keyboard('pppppp');
  await user.click(button);

  await waitFor(
    async () => {
      const text = await screen.findByText('not found');
      expect(text).toBeInTheDocument();
    },
    { timeout: 8000 }
  );
});
