import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";

import {MainPage} from "./main-page";

const mockFilms = [
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
];

it(`Main page correctly renders if authorization not required`, () => {
  const initialMockState = {
    FILTER: {
      currentFilterByFilmGenre: `all`,
    },
    FILMS: {
      films: mockFilms,
    },
  };
  const mockStore = configureStore();
  const props = {
    isAuthorizationRequired: false,
    userAvatarSrc: `img/avatar.jpg`,
  };

  const mainPage = renderer.create(
      <Provider store={mockStore(initialMockState)}>
        <BrowserRouter>
          <MainPage {...props}/>
        </BrowserRouter>
      </Provider>
  ).toJSON();

  expect(mainPage).toMatchSnapshot();
});


it(`Main page correctly renders if authorization required`, () => {
  const initialMockState = {
    FILTER: {
      currentFilterByFilmGenre: `all`,
    },
    FILMS: {
      films: mockFilms,
    },
  };
  const mockStore = configureStore();
  const props = {
    isAuthorizationRequired: true,
    userAvatarSrc: `img/avatar.jpg`,
  };

  const mainPage = renderer.create(
      <Provider store={mockStore(initialMockState)}>
        <BrowserRouter>
          <MainPage {...props}/>
        </BrowserRouter>
      </Provider>
  ).toJSON();

  expect(mainPage).toMatchSnapshot();
});
