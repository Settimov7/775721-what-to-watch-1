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

it(`Main page correctly renders if authorization not required`, () => {
  const initialMockState = {
    FILTER: {
      currentFilterByFilmGenre: `all`,
    },
    FILMS: {
      films: mockFilms,
      displayedFilmsNumber: 5
    },
  };
  const mockStore = configureStore();
  const props = {
    isAuthorizationRequired: false,
    userAvatarSrc: `img/avatar.jpg`,
    resetDisplayedFilmsNumber: jest.fn(),
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
      displayedFilmsNumber: 5
    },
  };
  const mockStore = configureStore();
  const props = {
    isAuthorizationRequired: true,
    userAvatarSrc: `img/avatar.jpg`,
    resetDisplayedFilmsNumber: jest.fn(),
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
