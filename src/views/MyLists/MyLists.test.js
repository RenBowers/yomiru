import React from 'react';
import { render } from '@testing-library/react';

import MyLists from './MyLists';

describe('MyLists view', () => {
  test('it should match the snapshot', () => {
    const { asFragment } = render(<MyLists />);
    expect(asFragment()).toMatchSnapshot();
  });
});
