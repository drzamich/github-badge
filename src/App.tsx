import React from 'react';
import styled from 'styled-components';
import { Badge } from './Badge';
import { ErrorBox } from './ErrorBox';
import { Loading } from './Loading';
import { Search } from './Search';
import { UserApiResponse } from './interfaces';
import { getResponse } from './apiHandler';
import { Color, GlobalStyle, Heading } from './styles';

const Container = styled.div`
  background: ${Color.White};
  padding: 24px;
`;

const App: React.FC = () => {
  const [userApiResponse, setUserApiReponse] = React.useState<UserApiResponse | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [firstRun, setFirstRun] = React.useState<boolean>(true);

  const onSearch = async (username: string) => {
    firstRun && setFirstRun(false);
    setUserApiReponse(null);
    setLoading(true);
    const apiReponse = await getResponse(username);
    setUserApiReponse(apiReponse);
    setLoading(false);
  };

  return (
    <>
      <GlobalStyle />
      <Search onSearch={onSearch} />
      <Container>
        {firstRun && <Heading>Use the search input to look for a user.</Heading>}
        {loading && <Loading />}
        {userApiResponse?.user && !loading
            && <Badge user={userApiResponse.user} />}
        {userApiResponse?.error && !loading
            && <ErrorBox error={userApiResponse?.error} />}
      </Container>
    </>
  );
};

export default App;
