import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import {UserBlock} from './user-block';

it(`User block correctly renders if authorization required`, () => {
  const props = {
    isAuthorizationRequired: true,
    userAvatarSrc: null,
  };
  const tree = renderer.create(
    <BrowserRouter>
      <UserBlock {...props}/>
    </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`User block correctly renders if authorization not required`, () => {
  const props = {
    isAuthorizationRequired: false,
    userAvatarSrc: `image.jpg`,
  };
  const tree = renderer.create(
    <BrowserRouter>
      <UserBlock {...props}/>
    </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
