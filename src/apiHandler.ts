import axios, { AxiosError } from 'axios';
import { isRight } from 'fp-ts/Either';
import { TypeC } from 'io-ts';
import { ApiError, isAxiosError, NetworkError, NotFoundError, OtherError } from './apiErrors';
import { User, Repository, UserApiResponse, UserT, RepositoryT } from './interfaces';

const checkValidity = <T, V extends TypeC<any>>(value: T, type: V): T => {
  const isValid = isRight(type.decode(value));
  if (isValid) return value;
  throw new ApiError();
};

const parseError = (error: Error | AxiosError): UserApiResponse => {
  if (error instanceof ApiError) return { error };
  if (isAxiosError(error)) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          return { error: new NotFoundError() };
        default:
          return { error: new OtherError() };
      }
    } else if (error.request) {
      return { error: new NetworkError() };
    }
  }
  return { error: new OtherError() };
};

export const getUser = async (username: string): Promise<User> => {
  const baseUrl = 'https://api.github.com/users/';
  return axios.get<User>(`${baseUrl}${username}`)
    .then((res) => res.data)
    .then(({ login, name, avatar_url, bio }) => ({ login, name, avatar_url, bio, repos: undefined }))
    .then((data) => checkValidity(data, UserT))
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
    .then((data) => data.map((e) => checkValidity(e, RepositoryT)))
    .then(filterRepos)
    .catch((error) => { throw error; });
};

export const getResponse = async (username: string): Promise<UserApiResponse> => {
  const usr = getUser(username);
  const rps = getRepositories(username);
  return Promise.all([usr, rps])
    .then(([userInfo, reposInfo]) => (
      {
        user: {
          ...userInfo,
          repos: reposInfo,
        },
      }
    ))
    .catch((error) => (parseError(error)));
};
