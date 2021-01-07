/* eslint-disable max-len */
import { User, Repository } from '../userInterfaces';

export const parsedUser: User = {
  name: 'Tejas Kumar',
  login: 'TejasQ',
  avatar_url: 'https://avatars1.githubusercontent.com/u/9947422?v=4',
  bio: 'I write code and love life.',
};

export const parsedRepos: Repository[] = [
  { full_name: 'TejasQ/add-gitignore', html_url: 'https://github.com/TejasQ/add-gitignore', stargazers_count: 450 },
  { full_name: 'TejasQ/basically-fullstack-graphql', html_url: 'https://github.com/TejasQ/basically-fullstack-graphql', stargazers_count: 194 },
  { full_name: 'TejasQ/basically-streams', html_url: 'https://github.com/TejasQ/basically-streams', stargazers_count: 122 },
];

export const finalUser: User = {
  ...parsedUser,
  repos: parsedRepos,
};
