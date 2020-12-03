import React from 'react';
import { render } from '@testing-library/react';

import Profile from './Profile';

describe('Profile view', () => {
  test('it should match the snapshot', () => {
    const { asFragment } = render(<Profile />);
    expect(asFragment()).toMatchSnapshot();
  });
});
