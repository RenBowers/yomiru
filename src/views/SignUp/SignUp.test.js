import React from 'react';
import { render } from '@testing-library/react';

import SignUp from './SignUp';

describe('SignUp view', () => {
  test('it should match the snapshot', () => {
    const { asFragment } = render(<SignUp />);
    expect(asFragment()).toMatchSnapshot();
  });
});
