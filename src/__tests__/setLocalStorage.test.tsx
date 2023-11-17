import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../components/App';

test('it show that clicking the Search button saves the entered value to the local storage', async () => {
  const user = userEvent.setup();
  render(<App />);

  const loader = await screen.findByTestId('loader');
  expect(loader).not.toBeNull();

  await waitFor(
    async () => {
      const results = await screen.findByTestId('results__wrapper');
      expect(results).toBeInTheDocument();
    },
    { timeout: 8000 }
  );

  const inputElement = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });
  await user.click(inputElement);
  await user.keyboard('luke');
  await user.click(searchButton);
  expect(localStorage.getItem('searchValue')).toBe('luke');
});
