import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import {AddReview} from './add-review';

it(`Details correctly renders`, () => {
  const props = {
    filmId: 1,
    filmName: `Film-1`,
    backgroundImage: `/image.jpg`,
    poster: `/image.jpg`,
    backgroundColor: `#123456`,
    userAvatarSrc: `/image.jpg`,
    postReview: jest.fn(),
  };

  const addReview = renderer.create(
    <BrowserRouter>
      <AddReview {...props}/>
    </BrowserRouter>
  ).toJSON();

  expect(addReview).toMatchSnapshot();
});
