import * as React from 'react';
import {shallow} from 'enzyme';

import {FilmCard} from "./film-card";

it(`On mouse enter on film card correctly triggered mouse enter handler`, () => {
  const onMouseEnter = jest.fn();
  const props = {
    id: 1,
    name: `Film-1`,
    previewImageSrc: `/image.jpg`,
    videoSrc: `video.mp4`,
  };

  FilmCard.prototype._mouseEnterHandler = onMouseEnter;

  const card = shallow(<FilmCard {...props}/>);

  card.simulate(`mouseEnter`, {preventDefault() {}});

  expect(onMouseEnter).toHaveBeenCalledTimes(1);
});

it(`on mouse leave from film card correctly clean timer id`, () => {
  const onMouseLeave = jest.fn();
  const props = {
    id: 1,
    name: `Film-1`,
    previewImageSrc: `/image.jpg`,
    videoSrc: `video.mp4`,
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

it(`on click correctly trigger click handler`, () => {
  const clickHandler = jest.fn();
  const props = {
    id: 1,
    name: `Film-1`,
    previewImageSrc: `/image.jpg`,
    videoSrc: `video.mp4`,
  };

  FilmCard.prototype._clickHandler = clickHandler;

  const card = shallow(<FilmCard {...props}/>);
  const image = card.find(`.small-movie-card__image`);

  image.simulate(`click`, {preventDefault() {}});

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
