import * as React from 'react';
import renderer from 'react-test-renderer';

import {FilmCard} from "./film-card";

const mock = {
  film: {
    id: 2,
    title: `Bohemian Rhapsody`,
    posterSrc: `poster.jpg`,
  },
};

it(`Film card correctly renders`, () => {
  const props = {
    film: mock.film,
  };

  const tree = renderer.create(<FilmCard {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
