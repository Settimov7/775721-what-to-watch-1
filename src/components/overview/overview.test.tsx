import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {Overview} from './overview';

it(`Overview correctly renders`, () => {
  const props = {
    rating: 5,
    director: `director`,
    description: `description`,
    starring: [`person-1`, `person-2`, `person-3`],
  };
  const overview = renderer.create(
    <Overview {...props}/>
  ).toJSON();

  expect(overview).toMatchSnapshot();
});
