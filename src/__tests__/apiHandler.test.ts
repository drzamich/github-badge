import axios from 'axios';
import { parsedUser, parsedRepos, finalUser } from '../mocks/ParsedUserInfo';
import { getUser, getRepositories, getResponse } from '../apiHandler';
import { UserApiResponse } from '../userInterfaces';
import {
  internalServerError, notFoundError, reposResponse, userReponse,
} from '../mocks/MockedHTTPResponses';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ApiHandler#getuser', () => {
  it('Properly fetches and parses data for a user', async () => {
    // Given
    mockedAxios.get.mockResolvedValue(userReponse);
    // When
    const value = await getUser('foo');
    // Then
    expect(value).toEqual(parsedUser);
  });
});

describe('ApiHandler#getRepositories', () => {
  it('Properly fetches parses and filters data for repositories', async () => {
    // Given
    mockedAxios.get.mockResolvedValue(reposResponse);
    // When
    const value = await getRepositories('foo');
    // Then
    expect(value).toEqual(parsedRepos);
  });
});

describe('ApiHandler#getResponse', () => {
  it('Properly fetches and merges user and repos info', async () => {
    // Given
    mockedAxios.get.mockResolvedValueOnce(userReponse);
    mockedAxios.get.mockResolvedValueOnce(reposResponse);
    const expectedResponse: UserApiResponse = {
      user: finalUser,
    };
    // When
    const reponse = await getResponse('foo');
    // Then
    expect(reponse).toEqual(expectedResponse);
  });

  it('Returns error when one of the requests failed', async () => {
    // Given
    mockedAxios.get.mockImplementationOnce(() => { throw internalServerError; });
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(reposResponse));
    const expectedResponse: UserApiResponse = {
      error: internalServerError,
    };
    // When
    const reponse = await getResponse('foo');
    // Then
    expect(reponse).toEqual(expectedResponse);
  });

  it('Returns error when both of the requests failed', async () => {
    // Given
    mockedAxios.get.mockRejectedValue(notFoundError);
    const expectedResponse: UserApiResponse = {
      error: notFoundError,
    };
    // When
    const reponse = await getResponse('foo');
    // Then
    expect(reponse).toEqual(expectedResponse);
  });
});
