import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";

import {SignIn} from "./sign-in";
import {createMemoryHistory} from "history";

const mockHistory = createMemoryHistory();

it(`Sign in screen correctly renders`, () => {
  const props = {
    login: jest.fn(),
    location: mockHistory.location,
  };
  const signIn = renderer.create(
    <BrowserRouter>
      <SignIn {...props} />
    </BrowserRouter>
    ).toJSON();

  expect(signIn).toMatchSnapshot();
});
