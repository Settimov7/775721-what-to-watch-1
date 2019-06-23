import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';

import {FullFilmCard} from './full-film-card';

describe(`Full film card correctly renders`, () => {
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
      onPlayButtonClick: jest.fn(),
      changeFilmFavoriteStatus: jest.fn(),
      isAuthorizationRequired: true,
    };
    const fullFilmCard = renderer.create(
      <Provider store={mockStore(initialMockState)}>
        <BrowserRouter>
          <FullFilmCard {...props}/>
        </BrowserRouter>
      </Provider>
    ).toJSON();

    expect(fullFilmCard).toMatchSnapshot();
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
      onPlayButtonClick: jest.fn(),
      changeFilmFavoriteStatus: jest.fn(),
      isAuthorizationRequired: true,
    };
    const fullFilmCard = renderer.create(
      <Provider store={mockStore(initialMockState)}>
        <BrowserRouter>
          <FullFilmCard {...props}/>
        </BrowserRouter>
      </Provider>
    ).toJSON();

    expect(fullFilmCard).toMatchSnapshot();
  });
});
