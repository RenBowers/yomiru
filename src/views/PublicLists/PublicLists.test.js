import React from 'react';
import { render } from '@testing-library/react';

import PublicLists from './PublicLists';

describe('PublicLists view', () => {
  test('it should match the snapshot', () => {
    const { asFragment } = render(<PublicLists />);
    expect(asFragment()).toMatchSnapshot();
  });
});
