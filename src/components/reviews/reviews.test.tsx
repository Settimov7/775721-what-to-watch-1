import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Reviews} from './reviews';

it(`Reviews correctly renders`, () => {
  const props = {
    reviews: [
      {
        id: 1,
        user: {
          id: 1,
          name: `name`,
        },
        rating: 7,
        comment: `comment`,
        date: "2019-06-18T11:52:42.143Z"
      },
      {
        id: 2,
        user: {
          id: 2,
          name: `name`,
        },
        rating: 9,
        comment: `comment`,
        date: "2019-07-18T11:52:42.143Z"
      },
    ],
  };

  const mainPage = renderer.create(
    <Reviews {...props}/>
  ).toJSON();

  expect(mainPage).toMatchSnapshot();
});
