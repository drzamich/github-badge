import axios from 'axios';
import { parsedUser, parsedRepos, finalUser } from '../mocks/ParsedUserInfo';
import { getUser, getRepositories, getResponse } from '../apiHandler';
import { UserApiResponse } from '../interfaces';
import { internalServerError, invalidUserReponse, notFoundError, validReposResponse, validUserReponse } from '../mocks/MockedHTTPResponses';
import { ApiError, NotFoundError, OtherError } from '../apiErrors';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ApiHandler#getuser', () => {
  it('Properly fetches and parses data for a user', async () => {
    // Given
    mockedAxios.get.mockResolvedValue(validUserReponse);
    // When
    const value = await getUser('foo');
    // Then
    expect(value).toEqual(parsedUser);
  });
});

describe('ApiHandler#getRepositories', () => {
  it('Properly fetches parses and filters data for repositories', async () => {
    // Given
    mockedAxios.get.mockResolvedValue(validReposResponse);
    // When
    const value = await getRepositories('foo');
    // Then
    expect(value).toEqual(parsedRepos);
  });
});

describe('ApiHandler#getResponse', () => {
  it('Properly fetches and merges user and repos info', async () => {
    // Given
    mockedAxios.get.mockResolvedValueOnce(validUserReponse);
    mockedAxios.get.mockResolvedValueOnce(validReposResponse);
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
    mockedAxios.get.mockImplementationOnce(() => { throw notFoundError; });
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(validReposResponse));
    const expectedResponse: UserApiResponse = {
      error: new NotFoundError(),
    };
    // When
    const reponse = await getResponse('foo');
    // Then
    expect(reponse).toEqual(expectedResponse);
  });

  it('Returns error when both of the requests failed', async () => {
    // Given
    const error = new OtherError();
    mockedAxios.get.mockRejectedValue(internalServerError);
    const expectedResponse: UserApiResponse = {
      error,
    };
    // When
    const reponse = await getResponse('foo');
    // Then
    expect(reponse).toEqual(expectedResponse);
  });

  it('Returns error when at least one response from API has invalid shape', async () => {
    // Given
    const error = new ApiError();
    // mockedAxios.get.mockResolvedValue(invalidUserReponse);
    mockedAxios.get.mockResolvedValueOnce(invalidUserReponse);
    mockedAxios.get.mockResolvedValueOnce(validReposResponse);
    const expectedResponse: UserApiResponse = {
      error,
    };
    // When
    const reponse = await getResponse('foo');
    // Then
    expect(reponse).toEqual(expectedResponse);
  });
});
