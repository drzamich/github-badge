import React from 'react';
import styled from 'styled-components';
import { User } from './interfaces';

const IdContainer = styled.div`
`;

const Img = styled.img`
`;

const Username = styled.h3`
`;

const Bio = styled.p`
`;

const TopReposHeading = styled.h3`

`;

const Repos = styled.ul`
`;

interface BadgeProps {
  user: User | undefined,
}

export const Badge: React.FC<BadgeProps> = ({ user }) => (
  <>
    <IdContainer>
      <Img src={user?.avatar_url} alt={user?.name || user?.login} />
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
  </>
);
