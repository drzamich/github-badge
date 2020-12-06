import React from 'react';
import { render } from '@testing-library/react';
import { AxiosError } from 'axios';
import { internalServerError, networkError, notFoundError } from '../mocks/MockedHTTPResponses';
import { ErrorBox } from '../ErrorBox';

describe('ErrorBox', () => {
  const errors: [string, AxiosError][] = [
    ['internal server error', internalServerError],
    ['not found error', notFoundError],
    ['network error', networkError],
  ];

  it.each(errors)('Displays proper error message for a %s', (errorType, error) => {
    // Given
    // When
    const component = render(<ErrorBox error={error} />);
    // Then
    expect(component).toMatchSnapshot();
  });
});
