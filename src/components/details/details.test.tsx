import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {Details} from './details';

it(`Details correctly renders`, () => {
  const props = {
    director: `director`,
    starring: [`person-1`, `person-2`, `person-3`],
    runTime: 99,
    genre: `Genre`,
    releasedYear: 2019,
  };
  const details = renderer.create(
    <Details {...props}/>
  ).toJSON();

  expect(details).toMatchSnapshot();
});
