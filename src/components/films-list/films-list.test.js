import * as React from 'react';
import renderer from 'react-test-renderer';

import {FilmsList} from "./films-list";

const mock = {
  films: [
    {
      id: 1,
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      genre: `fantastic`,
      posterSrc: `poster.jpg`,
      videoSrc: `video.mp4`,
    },
    {
      id: 2,
      title: `Bohemian Rhapsody`,
      genre: `drama`,
      posterSrc: `poster.jpg`,
      videoSrc: `video.mp4`,
    },
    {
      id: 3,
      title: `Macbeth`,
      genre: `drama`,
      posterSrc: `poster.jpg`,
      videoSrc: `video.mp4`,
    },
    {
      id: 4,
      title: `Aviator`,
      genre: `drama`,
      posterSrc: `poster.jpg`,
      videoSrc: `video.mp4`,
    },
    {
      id: 5,
      title: `We need to talk about Kevin`,
      genre: `comedy`,
      posterSrc: `poster.jpg`,
      videoSrc: `video.mp4`,
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
