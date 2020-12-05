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
`;

const Button = styled.button`
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
