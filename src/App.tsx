import React from 'react';
import styled from 'styled-components';
import { Badge } from './Badge';
import { ErrorBox } from './ErrorBox';
import { Loading } from './Loading';
import { Search } from './Search';

const Container = styled.div`
`;

const App: React.FC = () => (
  <>
    <Search />
    <Container>
      <Loading />
      <Badge />
      <ErrorBox />
    </Container>
  </>
);

export default App;
