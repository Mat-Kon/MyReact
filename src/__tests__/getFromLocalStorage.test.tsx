import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../components/App';

describe('Get value from local storage', () => {
  beforeEach(() => {
    window.localStorage.setItem('searchValue', 'Luke');
  });

  test('it show that the component retrieves the value from the local storage upon mounting', async () => {
    render(<App />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('10');

    const loader = await screen.findByTestId('loader');
    expect(loader).not.toBeNull();

    await waitFor(
      async () => {
        const results = await screen.findByTestId('results__wrapper');
        expect(localStorage.getItem('searchValue')).toBe('Luke');
      },
      { timeout: 8000 }
    );
  });
});
