import React from 'react';
import { render } from '@testing-library/react';

import Search from './Search';

describe('Search view', () => {
  test('it should match the snapshot', () => {
    const { asFragment } = render(<Search />);
    expect(asFragment()).toMatchSnapshot();
  });
});
