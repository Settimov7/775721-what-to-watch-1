import * as React from 'react';
import {shallow} from 'enzyme';

import {FilmCard} from "./film-card";

const mock = {
  film: {
    id: 2,
    title: `Bohemian Rhapsody`,
    posterSrc: `poster.jpg`,
  },
};

it(`Film title correctly triggered click event `, () => {
  const onClick = jest.fn();
  const props = {
    film: mock.film,
    onClick,
  };

  const card = shallow(<FilmCard {...props}/>);

  const title = card.find(`.small-movie-card__link`);
  title.simulate(`click`, {preventDefault() {}});

  expect(onClick).toHaveBeenCalledTimes(1);
});

it(`Film card play button correctly triggered click event`, () => {
  const onPlayClick = jest.fn(() => mock.film.id);
  const props = {
    film: mock.film,
    onPlayClick,
  };

  const card = shallow(<FilmCard {...props}/>);

  const button = card.find(`.small-movie-card__play-btn`);
  button.simulate(`click`, {preventDefault() {}});

  expect(onPlayClick).toHaveReturnedWith(mock.film.id);
});

it(`On mouse enter on film card correctly triggered mouse enter event`, () => {
  const onMouseEnter = jest.fn();
  const props = {
    film: mock.film,
    onMouseEnter,
  };

  const card = shallow(<FilmCard {...props}/>);
  const cardElement = card.find(`article`);

  cardElement.simulate(`mouseEnter`, {preventDefault() {}});

  expect(onMouseEnter).toHaveBeenCalledTimes(1);
});
