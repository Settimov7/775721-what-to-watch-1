import * as React from 'react';
import {shallow} from 'enzyme';

import {FilmCard} from "./film-card";

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

it(`On mouse enter on film card correctly triggered mouse enter handler`, () => {
  const onMouseEnter = jest.fn();
  const props = {
    film: mock.film,
  };

  FilmCard.prototype._mouseEnterHandler = onMouseEnter;

  const card = shallow(<FilmCard {...props}/>);

  card.simulate(`mouseEnter`, {preventDefault() {}});
  expect(onMouseEnter).toHaveBeenCalledTimes(1);
});

it(`on mouse leave from film card correctly clean timer id`, () => {
  const onMouseLeave = jest.fn();
  const props = {
    film: mock.film,
  };

  FilmCard.prototype._mouseLeaveHandler = onMouseLeave;

  const card = shallow(<FilmCard {...props}/>);

  card.simulate(`mouseLeave`, {preventDefault() {}});
  expect(onMouseLeave).toHaveBeenCalledTimes(1);
  expect(card.state()).toEqual({
    isPreviewPlaying: false,
    timerId: null,
  });
});
