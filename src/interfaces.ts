import { AxiosError } from 'axios';

export interface Repository {
  full_name: string,
  html_url: string,
  stargazers_count: number,
}

export interface User {
  login: string,
  avatar_url: string,
  bio: string | null,
  name: string | null,
  repos?: Repository[]
}

export interface UserApiResponse {
  error?: AxiosError
  user?: User,
}
