import * as React from 'react';
import renderer from 'react-test-renderer';

import {FilmCard} from "./film-card";

it(`Film card correctly renders`, () => {
  const props = {
    title: `Film title`
  };

  const tree = renderer.create(<FilmCard {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
