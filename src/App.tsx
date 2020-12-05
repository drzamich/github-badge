import React from 'react';
import styled from 'styled-components';
import { Badge } from './Badge';
import { ErrorBox } from './ErrorBox';
import { Loading } from './Loading';
import { Search } from './Search';
import { UserApiResponse } from './interfaces';
import { getResponse } from './apiHandler';

const Container = styled.div`
`;

const App: React.FC = () => {
  const [userApiResponse, setUserApiReponse] = React.useState<UserApiResponse | null>(null);

  const onSearch = async (username: string) => {
    const apiReponse = await getResponse(username);
    console.log(apiReponse);
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
