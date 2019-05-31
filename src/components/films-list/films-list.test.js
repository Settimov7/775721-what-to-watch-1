import * as React from 'react';
import renderer from 'react-test-renderer';

import {FilmsList} from "./films-list";

const mock = {
  films: [
    {
      id: 1,
      name: `Fantastic Beasts: The Crimes of Grindelwald`,
      genre: `fantastic`,
      previewImageSrc: `poster.jpg`,
      videoSrc: `video.mp4`,
    },
    {
      id: 2,
      name: `Bohemian Rhapsody`,
      genre: `drama`,
      previewImageSrc: `poster.jpg`,
      videoSrc: `video.mp4`,
    },
    {
      id: 3,
      name: `Macbeth`,
      genre: `drama`,
      previewImageSrc: `poster.jpg`,
      videoSrc: `video.mp4`,
    },
    {
      id: 4,
      name: `Aviator`,
      genre: `drama`,
      previewImageSrc: `poster.jpg`,
      videoSrc: `video.mp4`,
    },
    {
      id: 5,
      name: `We need to talk about Kevin`,
      genre: `comedy`,
      previewImageSrc: `poster.jpg`,
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
