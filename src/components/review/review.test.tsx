import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {Review} from './review';

it(`Review correctly renders`, () => {
  const props = {
    user: {
      id: 1,
      name: `name`,
    },
    rating: 7,
    comment: `comment`,
    date: "2019-06-18T11:52:42.143Z"
  };

  const mainPage = renderer.create(
    <Review {...props}/>
  ).toJSON();

  expect(mainPage).toMatchSnapshot();
});
