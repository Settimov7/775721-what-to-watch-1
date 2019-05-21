import * as React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {App} from './app';

it(`App correctly renders`, () => {
  const initialMockState = {
    currentFilterByFilmGenre: `all`,
    films: [
      {
        id: 1,
        title: `Fantastic Beasts: The Crimes of Grindelwald`,
        genre: `fantastic`,
        posterSrc: `poster.jpg`,
        videoSrc: `video.mp4`,
      },
      {
        id: 2,
        title: `Bohemian Rhapsody`,
        genre: `drama`,
        posterSrc: `poster.jpg`,
        videoSrc: `video.mp4`,
      },
      {
        id: 3,
        title: `Macbeth`,
        genre: `drama`,
        posterSrc: `poster.jpg`,
        videoSrc: `video.mp4`,
      },
      {
        id: 4,
        title: `Aviator`,
        genre: `drama`,
        posterSrc: `poster.jpg`,
        videoSrc: `video.mp4`,
      },
      {
        id: 5,
        title: `We need to talk about Kevin`,
        genre: `comedy`,
        posterSrc: `poster.jpg`,
        videoSrc: `video.mp4`,
      },
    ],
  };
  const mockStore = configureStore();

  const app = renderer.create(
      <Provider store={mockStore(initialMockState)}>
        <App />
      </Provider>
  ).toJSON();

  expect(app).toMatchSnapshot();
});
