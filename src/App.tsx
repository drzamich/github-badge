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
    setUserApiReponse(apiReponse);
  };

  return (
    <>
      <Search onSearch={onSearch} />
      <Container>
        <Loading />
        {userApiResponse?.user
            && <Badge user={userApiResponse.user} />}
        {userApiResponse?.error
            && <ErrorBox error={userApiResponse?.error} />}
      </Container>
    </>
  );
};

export default App;
