import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import {Logo} from './logo';

it(`Logo correctly renders`, () => {
  const tree = renderer.create(
    <BrowserRouter>
      <Logo />
    </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Light logo correctly renders`, () => {
  const props = {
    isLight: true,
  };
  const tree = renderer.create(
    <BrowserRouter>
      <Logo {...props}/>
    </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
