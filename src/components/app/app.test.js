import * as React from 'react';
import renderer from 'react-test-renderer';

import {App} from "./app";

const mock = {
  films: [
    {
      id: 1,
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      posterSrc: `poster.jpg`,
      videoSrc: `video.mp4`,
    },
    {
      id: 2,
      title: `Bohemian Rhapsody`,
      posterSrc: `poster.jpg`,
      videoSrc: `video.mp4`,
    },
    {
      id: 3,
      title: `Macbeth`,
      posterSrc: `poster.jpg`,
      videoSrc: `video.mp4`,
    },
    {
      id: 4,
      title: `Aviator`,
      posterSrc: `poster.jpg`,
      videoSrc: `video.mp4`,
    },
    {
      id: 5,
      title: `We need to talk about Kevin`,
      posterSrc: `poster.jpg`,
      videoSrc: `video.mp4`,
    },
  ],
};

it(`App correctly renders`, () => {
  const props = {
    films: mock.films,
  };

  const tree = renderer.create(<App {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
