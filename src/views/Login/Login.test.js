import React from 'react';
import { render } from '@testing-library/react';

import Login from './Login';

describe('Login Component', () => {
  test('it should match the snapshot', () => {
    const { asFragment } = render(<Login />);
    expect(asFragment()).toMatchSnapshot();
  });
});
