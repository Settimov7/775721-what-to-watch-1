import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import {FilmDetails} from './film-details';

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

  films: new Array(5).fill(null).map((film, index) => ({
    id: index + 1,
    name: `Film-${index + 1}`,
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
  })),
};

it(`Film details correctly renders if authorization not required`, () => {
  const props = {
    film: mock.film,
    isAuthorizationRequired: false,
    userAvatarSrc: `img/avatar.jpg`,
    sameGenreFilms: mock.films,
    onPlayButtonClick: jest.fn(),
  };

  const filmDetails = renderer.create(
    <BrowserRouter>
      <FilmDetails {...props}/>
    </BrowserRouter>
  ).toJSON();

  expect(filmDetails).toMatchSnapshot();
});

it(`Film details correctly renders if authorization required`, () => {
  const props = {
    film: mock.film,
    isAuthorizationRequired: true,
    userAvatarSrc: `img/avatar.jpg`,
    sameGenreFilms: mock.films,
    onPlayButtonClick: jest.fn(),
  };

  const filmDetails = renderer.create(
    <BrowserRouter>
      <FilmDetails {...props}/>
    </BrowserRouter>
  ).toJSON();

  expect(filmDetails).toMatchSnapshot();
});
