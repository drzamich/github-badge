import * as t from 'io-ts';

export const RepositoryT = t.type({
  full_name: t.string,
  html_url: t.string,
  stargazers_count: t.number,
});

export type Repository = t.TypeOf<typeof RepositoryT>;

export const UserT = t.type({
  login: t.string,
  avatar_url: t.string,
  bio: t.union([t.string, t.null]),
  name: t.union([t.string, t.null]),
  repos: t.union([t.undefined, t.array(RepositoryT)]),
});

export type User = t.TypeOf<typeof UserT>;
export interface UserApiResponse {
  error?: Error
  user?: User,
}
