import React from 'react';
import styled from 'styled-components';
import { Badge } from './Badge';
import { ErrorBox } from './ErrorBox';
import { Loading } from './Loading';
import { Search } from './Search';

const Container = styled.div`
`;

const App: React.FC = () => {
  const onSearch = (username: string) => {
    console.log(username);
  };

  return (
    <>
      <Search onSearch={onSearch} />
      <Container>
        <Loading />
        <Badge />
        <ErrorBox />
      </Container>
    </>
  );
};

export default App;
