import * as React from 'react';
import renderer from 'react-test-renderer';

import {FilmsList} from "./films-list";

const mock = {
  films: [
    {
      id: 1,
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      posterSrc: `poster.jpg`,
    },
    {
      id: 2,
      title: `Bohemian Rhapsody`,
      posterSrc: `poster.jpg`,
    },
    {
      id: 3,
      title: `Macbeth`,
      posterSrc: `poster.jpg`,
    },
    {
      id: 4,
      title: `Aviator`,
      posterSrc: `poster.jpg`,
    },
    {
      id: 5,
      title: `We need to talk about Kevin`,
      posterSrc: `poster.jpg`,
    },
  ],
};

it(`Films list correctly renders`, () => {
  const props = {
    films: mock.films,
  };

  const tree = renderer.create(<FilmsList {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
