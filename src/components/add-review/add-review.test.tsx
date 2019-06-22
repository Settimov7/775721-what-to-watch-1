import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";

import {AddReview} from './add-review';

it(`Add review correctly renders`, () => {
  const initialMockState = {
    USER: {
      id: 1,
      name: `name`,
      email: `email@mail.com`,
      avatarSrc: `image.src`,
      isAuthorizationRequired: false,
    },
  };
  const mockStore = configureStore();
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
    <Provider store={mockStore(initialMockState)}>
      <BrowserRouter>
        <AddReview {...props}/>
      </BrowserRouter>
    </Provider>
  ).toJSON();

  expect(addReview).toMatchSnapshot();
});
