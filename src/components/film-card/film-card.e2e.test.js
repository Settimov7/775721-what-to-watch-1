import * as React from 'react';
import {shallow} from 'enzyme';

import {FilmCard} from "./film-card";

const mock = {
  film: {
    id: 2,
    title: `Bohemian Rhapsody`,
    posterSrc: `poster.jpg`,
    videoSrc: `video.mp4`,
  },
};

it(`Film title correctly triggered click event `, () => {
  const onTitleClick = jest.fn();
  const props = {
    film: mock.film,
    onTitleClick,
  };

  const card = shallow(<FilmCard {...props}/>);

  const title = card.find(`.small-movie-card__link`);
  title.simulate(`click`, {preventDefault() {}});

  expect(onTitleClick).toHaveBeenCalledTimes(1);
});

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
