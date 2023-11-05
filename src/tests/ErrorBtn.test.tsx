import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBtn from '../components/ErrorBtn';

describe('ErrorBtn', () => {
  it('should render a button with text “Get an error”', () => {
    render(<ErrorBtn />);
    const button = screen.getByRole('button');
    expect(button).not.toBeNull();
  });

  it('should throw an error when the button is clicked', () => {
    render(<ErrorBtn />);
    const button = screen.getByRole('button');
    expect(() => fireEvent.click(button)).toThrow('This is a test error!');
  });
});
