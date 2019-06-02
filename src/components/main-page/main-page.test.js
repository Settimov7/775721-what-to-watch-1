import * as React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {MainPage} from "./main-page";

it(`Main page correctly renders if authorization not required`, () => {
  const initialMockState = {
    FILTER: {
      currentFilterByFilmGenre: `all`,
    },
    FILMS: {
      films: [
        {
          id: 1,
          name: `Fantastic Beasts: The Crimes of Grindelwald`,
          genre: `Fantasy`,
          previewImageSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
        {
          id: 2,
          name: `Bohemian Rhapsody`,
          genre: `Drama`,
          previewImageSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
        {
          id: 3,
          name: `Macbeth`,
          genre: `Drama`,
          previewImageSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
        {
          id: 4,
          name: `Aviator`,
          genre: `Drama`,
          previewImageSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
        {
          id: 5,
          name: `We need to talk about Kevin`,
          genre: `Crime`,
          previewImageSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
      ],
    },
  };
  const mockStore = configureStore();
  const props = {
    isAuthorizationRequired: false,
    userAvatarSrc: `img/avatar.jpg`,
    openSignInPage: jest.fn(),
  };

  const mainPage = renderer.create(
      <Provider store={mockStore(initialMockState)}>
        <MainPage {...props}/>
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
      films: [
        {
          id: 1,
          name: `Fantastic Beasts: The Crimes of Grindelwald`,
          genre: `Fantasy`,
          previewImageSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
        {
          id: 2,
          name: `Bohemian Rhapsody`,
          genre: `Drama`,
          previewImageSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
        {
          id: 3,
          name: `Macbeth`,
          genre: `Drama`,
          previewImageSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
        {
          id: 4,
          name: `Aviator`,
          genre: `Drama`,
          previewImageSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
        {
          id: 5,
          name: `We need to talk about Kevin`,
          genre: `Crime`,
          previewImageSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
      ],
    },
  };
  const mockStore = configureStore();
  const props = {
    isAuthorizationRequired: true,
    userAvatarSrc: `img/avatar.jpg`,
    openSignInPage: jest.fn(),
  };

  const mainPage = renderer.create(
      <Provider store={mockStore(initialMockState)}>
        <MainPage {...props}/>
      </Provider>
  ).toJSON();

  expect(mainPage).toMatchSnapshot();
});
