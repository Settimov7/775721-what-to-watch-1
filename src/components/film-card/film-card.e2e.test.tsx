import * as React from 'react';
import {shallow} from 'enzyme';

import {FilmCard} from './film-card';

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

it(`On play button click correctly trigger play button handler`, () => {
  const onPlayButtonClick = jest.fn();
  const changeFilmFavoriteStatus = jest.fn();
  const props = {
    onPlayButtonClick,
    changeFilmFavoriteStatus,
    film: mockFilm,
  };

  const filmCard = shallow(<FilmCard {...props} />);
  const playButton = filmCard.find(`.btn--play`);

  playButton.simulate(`click`, {preventDefault() {}});

  expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
});

it(`On my list button click correctly trigger play button handler`, () => {
  const onPlayButtonClick = jest.fn();
  const changeFilmFavoriteStatus = jest.fn();
  const props = {
    onPlayButtonClick,
    changeFilmFavoriteStatus,
    film: mockFilm,
  };

  const filmCard = shallow(<FilmCard {...props} />);
  const myListButton = filmCard.find(`.btn--list`);

  myListButton.simulate(`click`, {preventDefault() {}});

  expect(changeFilmFavoriteStatus).toHaveBeenCalledTimes(1);
});
