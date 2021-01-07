/* eslint-disable default-case */
import React from 'react';
import styled from 'styled-components';
import { Badge } from './Badge';
import { ErrorBox } from './ErrorBox';
import { Loading } from './Loading';
import { Search } from './Search';
import { UserApiResponse } from './userInterfaces';
import { getResponse } from './apiHandler';
import { Color, GlobalStyle, Heading } from './styles';

const Container = styled.div`
  background: ${Color.White};
  padding: 24px;
  flex: 1 1 auto;
`;

type Async<T> = {
  type: 'loading'
} | {
  type: 'done',
  val: T
} | {
  type: 'notStarted',
};

interface UseApiResponse {
  apiResponse: Async<UserApiResponse>,
  setUsername: React.Dispatch<React.SetStateAction<string>>
}

const useApiResponse = (): UseApiResponse => {
  const [username, setUsername] = React.useState('');
  const [apiResponse, setApiReponse] = React.useState<Async<UserApiResponse>>({ type: 'notStarted' });

  React.useEffect(() => {
    const setData = async () => {
      setApiReponse({ type: 'loading' });
      const apiReponse = await getResponse(username);
      setApiReponse({ type: 'done', val: apiReponse });
    };
    if (username !== '') setData();
  }, [username]);

  return {
    apiResponse, setUsername,
  };
};

const App: React.FC = () => {
  const {
    apiResponse, setUsername,
  } = useApiResponse();

  // eslint-disable-next-line consistent-return
  const render = () => {
    switch (apiResponse.type) {
      case 'notStarted':
        return <Heading>Use the search input to look for a user.</Heading>;
      case 'loading':
        return <Loading />;
      case 'done':
        return (
          <>
            {apiResponse.val.user
          && <Badge loading={false} user={apiResponse.val.user} />}
            {apiResponse.val.error
         && <ErrorBox error={apiResponse.val.error} />}
          </>
        );
    }
  };

  return (
    <>
      <GlobalStyle />
      <Search onSearch={setUsername} />
      <Container id="dynamic-container" aria-live="polite">
        {render()}
      </Container>
    </>
  );
};

export default App;
