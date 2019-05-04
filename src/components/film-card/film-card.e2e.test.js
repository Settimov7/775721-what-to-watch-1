import * as React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {FilmCard} from "./film-card";

Enzyme.configure({adapter: new Adapter()});

it(`Film title correctly triggered click event `, () => {
  const props = {
    title: `Film title`
  };
  const clickHandler = jest.fn();
  const app = shallow(<FilmCard {...props} onClick={clickHandler}/>);
  const startButton = app.find(`.small-movie-card__link`);

  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
