import * as React from 'react';
import renderer from 'react-test-renderer';

import {SignIn} from "./sign-in";

it(`Sign in screen correctly renders`, () => {
  const props = {
    login: jest.fn(),
    location: {
      state: {
        from: `/some-url`,
      }
    },
  };
  const signIn = renderer.create(<SignIn {...props} />).toJSON();

  expect(signIn).toMatchSnapshot();
});
