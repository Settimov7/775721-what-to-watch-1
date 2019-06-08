import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {FilmCard} from "./film-card";

const mock = {
  film: {
    id: 1,
    name: `Film-1`,
    posterImageSrc: `/image.jpg`,
    previewImageSrc: `/image.jpg`,
    backgroundImageSrc: `/image.jpg`,
    backgroundColor: `#123456`,
    description: `description`,
    rating: 5,
    scores: 123456,
    director: `director`,
    starring: [`person-1`, `person-2`, `person-3`],
    runTime: 99,
    genre: `Genre`,
    releasedYear: 2019,
    isFavorite: false,
    videoSrc: `video.mp4`,
    previewVideoSrc: `video.mp4`,
  },
};

it(`Film card correctly renders`, () => {
  const props = {
    film: mock.film,
  };

  const card = renderer.create(<FilmCard {...props}/>).toJSON();

  expect(card).toMatchSnapshot();
});
