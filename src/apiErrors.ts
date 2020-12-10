/* eslint-disable max-classes-per-file */
import { AxiosError } from 'axios';

export class ApiError extends Error {
  constructor() {
    super();
    this.name = 'ApiError';
    this.message = 'API Error.';
  }
}

export class NetworkError extends Error {
  constructor() {
    super();
    this.name = 'NetworkError';
    this.message = 'Network Error.';
  }
}

export class NotFoundError extends Error {
  constructor() {
    super();
    this.name = 'NotFoundError';
    this.message = 'User not found.';
  }
}

export class OtherError extends Error {
  constructor() {
    super();
    this.name = 'OtherError';
    this.message = 'Error occured.';
  }
}

export const isAxiosError = (error: Error | AxiosError): error is AxiosError => {
  return (error as AxiosError).isAxiosError === true;
};
