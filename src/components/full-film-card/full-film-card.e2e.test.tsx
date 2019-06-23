import * as React from 'react';
import {shallow} from 'enzyme';

import {FullFilmCard} from './full-film-card';

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
};

it(`On click play button trigger play handler`, () => {
  const onPlayButtonClick = jest.fn();
  const changeFilmFavoriteStatus = jest.fn();
  const props = {
    film: mock.film,
    isAuthorizationRequired: false,
    onPlayButtonClick,
    changeFilmFavoriteStatus,
  };
  const fullFilmCard = shallow(<FullFilmCard {...props} />);
  const playButton = fullFilmCard.find(`.btn--play`);

  playButton.simulate(`click`, {preventDefault() {}});

  expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
});

it(`On my list button click trigger play handler`, () => {
  const onPlayButtonClick = jest.fn();
  const changeFilmFavoriteStatus = jest.fn();
  const props = {
    film: mock.film,
    isAuthorizationRequired: false,
    onPlayButtonClick,
    changeFilmFavoriteStatus,
  };
  const fullFilmCard = shallow(<FullFilmCard {...props} />);
  const myListButton = fullFilmCard.find(`.btn--list`);

  myListButton.simulate(`click`, {preventDefault() {}});

  expect(changeFilmFavoriteStatus).toHaveBeenCalledTimes(1);
});
