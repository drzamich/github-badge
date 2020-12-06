import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders the app without crashing and matches snapshot', () => {
  const app = render(<App />);
  expect(app).toMatchSnapshot();
});
