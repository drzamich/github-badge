import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';
import { finalUser } from '../mocks/ParsedUserInfo';

describe('Badge', () => {
  const setLoading = jest.fn();

  it('Renders user info properly when loading is completed', () => {
    // Given
    const user = finalUser;
    const loading = false;
    // When
    const badge = render(<Badge user={user} loading={loading} setLoading={setLoading} />);
    // Then
    expect(screen.getByText('Top repositories')).toBeVisible();
    expect(badge).toMatchSnapshot();
  });

  it('Does not render user info when loading is not completed', () => {
    // Given
    const user = finalUser;
    const loading = true;
    // When
    const badge = render(<Badge user={user} loading={loading} setLoading={setLoading} />);
    // Then
    expect(screen.getByText('Top repositories')).not.toBeVisible();
    expect(badge).toMatchSnapshot();
  });
});
