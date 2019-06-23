import * as React from 'react';
import {shallow} from 'enzyme';

import {SmallFilmCard} from "./small-film-card";

it(`On mouse enter on film card correctly triggered mouse enter handler`, () => {
  const onMouseEnter = jest.fn();
  const props = {
    id: 1,
    name: `Film-1`,
    previewImageSrc: `/image.jpg`,
    videoSrc: `video.mp4`,
  };

  SmallFilmCard.prototype._mouseEnterHandler = onMouseEnter;

  const card = shallow(<SmallFilmCard {...props}/>);

  card.simulate(`mouseEnter`, {preventDefault() {}});

  expect(onMouseEnter).toHaveBeenCalledTimes(1);
});

it(`On mouse leave from film card correctly clean timer id`, () => {
  const onMouseLeave = jest.fn();
  const props = {
    id: 1,
    name: `Film-1`,
    previewImageSrc: `/image.jpg`,
    videoSrc: `video.mp4`,
  };

  SmallFilmCard.prototype._mouseLeaveHandler = onMouseLeave;

  const card = shallow(<SmallFilmCard {...props}/>);

  card.simulate(`mouseLeave`, {preventDefault() {}});

  expect(onMouseLeave).toHaveBeenCalledTimes(1);
  expect(card.state()).toEqual({
    isPreviewPlaying: false,
    timerId: null,
  });
});

it(`On click correctly trigger click handler`, () => {
  const clickHandler = jest.fn();
  const props = {
    id: 1,
    name: `Film-1`,
    previewImageSrc: `/image.jpg`,
    videoSrc: `video.mp4`,
  };

  SmallFilmCard.prototype._clickHandler = clickHandler;

  const card = shallow(<SmallFilmCard {...props}/>);
  const image = card.find(`.small-movie-card__image`);

  image.simulate(`click`, {preventDefault() {}});

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
