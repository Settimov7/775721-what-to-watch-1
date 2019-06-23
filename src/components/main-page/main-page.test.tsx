import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";

import {MainPage} from "./main-page";

const mockFilms = Array(10).fill(null).map((film, index) => ({
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
}));

describe(`Main page correctly renders`, () => {
  it(`Correctly renders if authorization not required`, () => {
    const initialMockState = {
      FILTER: {
        currentFilterByFilmGenre: `all`,
      },
      FILMS: {
        films: mockFilms,
        displayedFilmsNumber: 5
      },
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
      resetDisplayedFilmsNumber: jest.fn(),
      onPlayButtonClick: jest.fn(),
      film: {
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

  it(`Correctly renders if authorization required`, () => {
    const initialMockState = {
      FILTER: {
        currentFilterByFilmGenre: `all`,
      },
      FILMS: {
        films: mockFilms,
        displayedFilmsNumber: 5
      },
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
      resetDisplayedFilmsNumber: jest.fn(),
      onPlayButtonClick: jest.fn(),
      film: {
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
});
