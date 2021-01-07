import { AxiosError, AxiosResponse } from 'axios';
import UserEndpointResponse from './UserEndpointResponse.json';
import ReposEndpointResponse from './ReposEndpointResponse.json';
import { Repository, User } from '../userInterfaces';

const defResponse = {
  headers: [],
  config: {},
};

const defSuccessResponse = {
  ...defResponse,
  status: 200,
  statusText: 'success',
};

const defErrorResponse: AxiosResponse = {
  ...defResponse,
  status: 500,
  statusText: 'success',
  data: null,
};

const defError: AxiosError = {
  config: {},
  isAxiosError: true,
  toJSON: () => ({}),
  name: '',
  message: '',
};

export const userReponse: AxiosResponse<User> = {
  data: UserEndpointResponse,
  ...defSuccessResponse,
};

export const reposResponse: AxiosResponse<Repository[]> = {
  data: ReposEndpointResponse,
  ...defSuccessResponse,
};

export const networkError: AxiosError = {
  ...defError,
  request: {},
};

export const internalServerError: AxiosError = {
  ...defError,
  response: {
    ...defErrorResponse,
  },
};

export const notFoundError: AxiosError = {
  ...defError,
  response: {
    ...defErrorResponse,
    status: 404,
  },
};
