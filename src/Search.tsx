import React from 'react';
import styled from 'styled-components';
import { Color } from './styles';

const Container = styled.div`
  background: ${Color.White};
  padding: 24px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Input = styled.input`
  background: ${Color.Porcelain};
  color: ${Color.SilverChalice};
  padding: 10px 32px;
  font-size: 1rem;
  border-radius: 8px;
  border: 0;

  &::placeholder {
    color: ${Color.SilverChalice};
  }
`;

const Button = styled.button`
  background: ${Color.RoyalBlue};
  border: 0;
  border-radius: 8px;
  padding: 12px;
  font-size: 0.85rem;
  line-height: 0.85rem;
  color: ${Color.White};
  font-weight: 500;
  cursor: pointer;
`;

interface SearchProps {
  onSearch(value: string): void
}

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [value, setValue] = React.useState('');

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      onSearch(value);
    }
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="Search for users"
        autoComplete="off"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        onKeyDown={onInputKeyDown}
      />
      <Button type="button" onClick={() => onSearch(value)}>
        Search
      </Button>
    </Container>
  );
};
