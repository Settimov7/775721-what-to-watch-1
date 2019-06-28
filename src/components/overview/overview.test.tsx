import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {Overview} from './overview';

it(`Overview correctly renders`, () => {
  const props = {
    rating: 10,
    director: `director`,
    description: `description`,
    starring: [`person-1`, `person-2`, `person-3`],
    scores: 1000,
  };
  const overview = renderer.create(
    <Overview {...props}/>
  ).toJSON();

  expect(overview).toMatchSnapshot();
});
