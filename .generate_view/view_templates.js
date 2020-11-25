// view.js
exports.view = name => `import React from 'react';
import './${name}.css';

function ${name}() {
  return (<div>Hello 👋, I am a ${name} view.</div>);
};

export default ${name};
`;

// view.test.js
exports.test = name => `import React from 'react';
import { render } from '@testing-library/react';

import ${name} from './${name}';

describe('${name} view', () => {
  test('it should match the snapshot', () => {
    const { asFragment } = render(<${name} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
`;

