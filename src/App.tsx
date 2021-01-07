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

// interface UseApiResponse {
//   apiResponse: UserApiResponse | null,
//   loading: boolean,
//   setUsername: React.Dispatch<React.SetStateAction<string>>
//   firstRun: boolean,
// }

// type X<T> = {
//   type: 'foo'
// } | {
//   type: 'bar',
//   val: T,
// };

// const x: X<string> = { type: 'bar', val: '1000' };
// const x2: X<string> = { type: 'foo' };

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
  // const [loading, setLoading] = React.useState(false);
  const [apiResponse, setApiReponse] = React.useState<Async<UserApiResponse>>({ type: 'notStarted' });
  // const [firstRun, setFirstRun] = React.useState<boolean>(true);

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

// const useApiResponse = (): UseApiResponse => {
//   const [username, setUsername] = React.useState('');
//   const [loading, setLoading] = React.useState(false);
//   const [apiResponse, setApiReponse] = React.useState<UserApiResponse | null>(null);
//   const [firstRun, setFirstRun] = React.useState<boolean>(true);

//   React.useEffect(() => {
//     const setData = async () => {
//       firstRun && setFirstRun(false);
//       setLoading(true);
//       const apiReponse = await getResponse(username);
//       setApiReponse(apiReponse);
//       if (!(apiReponse.user)) {
//         setLoading(false);
//       }
//     };
//     if (username !== '') setData();
//   }, [username]);

//   return {
//     apiResponse, loading, setUsername, firstRun,
//   };
// };

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
