import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';

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

describe(`Film details correctly renders`, () => {
  it(`Correctly renders if authorization not required`, () => {
    const initialMockState = {
      USER: {
        id: 1,
        name: `name`,
        email: `email@mail.com`,
        avatarSrc: `image.src`,
        isAuthorizationRequired: false,
      },
    };
    const mockStore = configureStore();
    const props = {
      film: mock.film,
      onPlayButtonClick: jest.fn(),
      sameGenreFilms: mock.films,
    };

    const filmDetails = renderer.create(
      <Provider store={mockStore(initialMockState)}>
        <BrowserRouter>
          <FilmDetails {...props}/>
        </BrowserRouter>
      </Provider>
    ).toJSON();

    expect(filmDetails).toMatchSnapshot();
  });

  it(`Correctly renders if authorization required`, () => {
    const initialMockState = {
      USER: {
        id: null,
        name: null,
        email: null,
        avatarSrc: null,
        isAuthorizationRequired: true,
      },
    };
    const mockStore = configureStore();
    const props = {
      film: mock.film,
      onPlayButtonClick: jest.fn(),
      sameGenreFilms: mock.films,
    };

    const filmDetails = renderer.create(
      <Provider store={mockStore(initialMockState)}>
        <BrowserRouter>
          <FilmDetails {...props}/>
        </BrowserRouter>
      </Provider>
    ).toJSON();

    expect(filmDetails).toMatchSnapshot();
  });
});
