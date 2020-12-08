/* eslint-disable max-len */
import { User, Repository } from '../interfaces';

export const parsedUser: User = {
  name: 'Tejas Kumar',
  login: 'TejasQ',
  avatar_url: 'https://avatars1.githubusercontent.com/u/9947422?v=4',
  bio: 'I write code and love life.',
};

export const parsedRepos: Repository[] = [
  { full_name: 'TejasQ/add-gitignore', html_url: 'https://github.com/TejasQ/add-gitignore', stargazers_count: 450 },
  { full_name: 'TejasQ/anna-artemov.now.sh', html_url: 'https://github.com/TejasQ/anna-artemov.now.sh', stargazers_count: 5 },
  { full_name: 'TejasQ/awesome-cli-apps', html_url: 'https://github.com/TejasQ/awesome-cli-apps', stargazers_count: 3 },
];

export const finalUser: User = {
  ...parsedUser,
  repos: parsedRepos,
};
