import axios from 'axios';
import { User, Repository, UserApiResponse } from './userInterfaces';

export const getUser = async (username: string): Promise<User> => {
  const baseUrl = 'https://api.github.com/users/';
  return axios.get<User>(`${baseUrl}${username}`)
    .then((res) => res.data)
    .then(({
      login, name, avatar_url, bio,
    }) => ({
      login, name, avatar_url, bio,
    }))
    .catch((error) => { throw error; });
};

export const getRepositories = async (username: string): Promise<Repository[]> => {
  const filterRepos = (rps: Repository[]): Repository[] => {
    const reposCount = 3;
    const sortedByStars = rps.sort((a, b) => b.stargazers_count - a.stargazers_count);
    return sortedByStars.slice(0, reposCount);
  };

  const baseUrl = 'https://api.github.com/users/';
  return axios.get<Repository[]>(`${baseUrl}${username}/repos`)
    .then((res) => res.data)
    .then((res) => res?.map(
      ({ full_name, html_url, stargazers_count }) => ({ full_name, html_url, stargazers_count }),
    ))
    .then(filterRepos)
    .catch((error) => { throw error; });
};

export const getResponse = async (username: string): Promise<UserApiResponse> => {
  const usr = getUser(username);
  const rps = getRepositories(username);
  return Promise.all([usr, rps]).then(([userInfo, reposInfo]) => ({
    user: {
      ...userInfo,
      repos: reposInfo,
    },
  })).catch((error) => ({ error }));
};
