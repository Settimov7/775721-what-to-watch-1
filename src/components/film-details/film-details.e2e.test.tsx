import * as React from 'react';
import {shallow} from 'enzyme';

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

it(`On click play button trigger play handler`, () => {
  const onPlayButtonClick = jest.fn();
  const props = {
    film: mock.film,
    isAuthorizationRequired: false,
    userAvatarSrc: `img/avatar.jpg`,
    sameGenreFilms: mock.films,
    onPlayButtonClick,
  };
  const filmDetails = shallow(<FilmDetails {...props} />);
  const playButton = filmDetails.find(`.btn--play`);

  playButton.simulate(`click`, {preventDefault() {}});

  expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
});
