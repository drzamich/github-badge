import axios from 'axios';
import { User, Repository, UserApiResponse } from './userInterfaces';

const BASE_URL = 'https://api.github.com/users/';

export const getUser = async (username: string): Promise<User> => {
  const result = await axios.get<User>(`${BASE_URL}${username}`);
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    login, avatar_url, bio, name,
  } = result.data;
  return {
    login, avatar_url, bio, name,
  };
};

export const getRepositories = async (username: string): Promise<Repository[]> => {
  const filterRepos = (rps: Repository[]): Repository[] => {
    const reposCount = 3;
    const sortedByStars = rps.sort((a, b) => b.stargazers_count - a.stargazers_count);
    return sortedByStars.slice(0, reposCount);
  };

  return axios.get<Repository[]>(`${BASE_URL}${username}/repos`)
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
