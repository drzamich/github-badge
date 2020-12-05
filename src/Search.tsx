import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
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
  return (
    <Container>
      <Input
        type="text"
        placeholder="Search for users"
        autoComplete="off"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
      <Button type="button" onClick={() => onSearch(value)}>
        Search
      </Button>
    </Container>
  );
};
