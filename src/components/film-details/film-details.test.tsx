import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {FilmDetails} from './film-details';
import {BrowserRouter} from 'react-router-dom';

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

  films: [
    {
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
    {
      id: 2,
      name: `Film-2`,
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
    {
      id: 3,
      name: `Film-3`,
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
    {
      id: 4,
      name: `Film-4`,
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
    {
      id: 5,
      name: `Film-5`,
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
  ],
};


it(`Film details correctly renders`, () => {
  const props = {
    film: mock.film,
    isAuthorizationRequired: false,
    userAvatarSrc: `img/avatar.jpg`,
    sameGenreFilms: mock.films,
  };

  const filmDetails = renderer.create(
    <BrowserRouter>
      <FilmDetails {...props}/>
    </BrowserRouter>
  ).toJSON();

  expect(filmDetails).toMatchSnapshot();
});