import * as React from 'react';
import {shallow} from 'enzyme';

import {MainPage} from './main-page';

const mockFilm = {
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
};

it(`When component did mount trigger reset displayed films`, () => {
  const onPlayButtonClick = jest.fn();
  const resetDisplayedFilmsNumber = jest.fn();
  const props = {
    resetDisplayedFilmsNumber,
    onPlayButtonClick,
    film: mockFilm,
  };

  shallow(<MainPage {...props} />);

  expect(resetDisplayedFilmsNumber).toHaveBeenCalledTimes(1);
});
