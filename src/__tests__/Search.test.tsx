import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Search } from '../Search';

describe('Search', () => {
  it('calls onSearch with proper value when button is clicked', () => {
    // Given
    const onSearch = jest.fn();
    render(<Search onSearch={onSearch} />);
    const input = screen.getByPlaceholderText('Search for users');
    const button = screen.getByText('Search');
    const value = 'foo';

    // When
    fireEvent.change(input, { target: { value } });
    fireEvent.click(button);

    // Then
    expect(onSearch).toBeCalledTimes(1);
    expect(onSearch).toBeCalledWith(value);
  });

  it('calls onSearch with proper value when enter key is pressed in the input field', () => {
    // Given
    const onSearch = jest.fn();
    render(<Search onSearch={onSearch} />);
    const input = screen.getByPlaceholderText('Search for users');
    const value = 'foo';

    // When
    fireEvent.change(input, { target: { value } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // Then
    expect(onSearch).toBeCalledTimes(1);
    expect(onSearch).toBeCalledWith(value);
  });
});
