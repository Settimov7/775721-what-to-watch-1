import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {Rating} from './rating';

it(`Rating correctly renders`, () => {
  const onChange = jest.fn();
  const props = {
    max: 5,
    onChange,
  };
  const rating = renderer.create(
    <Rating {...props}/>
  ).toJSON();

  expect(rating).toMatchSnapshot();
});
