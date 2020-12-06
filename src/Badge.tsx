import React from 'react';
import styled from 'styled-components';
import { User } from './interfaces';
import { Color, Heading } from './styles';

interface ContainerDiv {
  $loading: boolean,
}

const Container = styled.div<ContainerDiv>`
  display: ${(props) => (props.$loading ? 'none' : 'block')};
`;

const IdContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

const Img = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 12px;
`;

const Username = styled.h3`
  word-spacing: 300px;
  margin-left: 16px;
`;

const Bio = styled.p`
  color: ${Color.Gray};
  margin-top: 16px;
`;

const TopReposHeading = styled(Heading)`
  margin: 16px 0;
`;

const Repos = styled.ul`
  list-style: none;
  a {
    display: block;
    padding: 16px;
    box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    color: ${Color.RoyalBlue};
    text-decoration: none;
    margin-bottom: 16px;
    word-break: break-all;

    &:hover {
      text-decoration: underline;
    }
  }
`;

interface BadgeProps {
  user: User | undefined,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Badge: React.FC<BadgeProps> = ({ user, loading, setLoading }) => (
  <Container $loading={loading} aria-hidden={loading}>
    <IdContainer>
      <Img
        src={user?.avatar_url}
        alt={user?.name || user?.login}
        onLoad={() => setLoading(false)}
      />
      <Username>{user?.name || user?.login}</Username>
    </IdContainer>

    {user?.bio && <Bio>{user?.bio}</Bio>}
    {!(user?.repos?.length) && <TopReposHeading>User has no repositories.</TopReposHeading> }
    {!!(user?.repos?.length)
  && (
    <>
      <TopReposHeading>Top repositories</TopReposHeading>
      <Repos>
        {user?.repos.map((repo) => (
          <li key={repo.html_url}>
            <a href={repo.html_url}>{repo.full_name}</a>
          </li>
        ))}
      </Repos>
    </>
  ) }
  </Container>
);
