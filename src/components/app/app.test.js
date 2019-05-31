import * as React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {App} from './app';

it(`App correctly renders`, () => {
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

  const app = renderer.create(
      <Provider store={mockStore(initialMockState)}>
        <App />
      </Provider>
  ).toJSON();

  expect(app).toMatchSnapshot();
});
