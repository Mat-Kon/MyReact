import '@testing-library/jest-dom';
import mockPeople from '../mock/mockPeopleData.json';
import ItemBlock from '../components/ItemBlock';
import { render, screen } from '@testing-library/react';

describe('ItemsBlock', () => {
  it('It show  that the card component renders the relevant card data', () => {
    render(<ItemBlock item={mockPeople.results[0]} />);

    const name = screen.getByText('Luke Skywalker');
    const height = screen.getByText('172');

    expect(name).toBeInTheDocument();
    expect(height).toBeInTheDocument();
  });
});
