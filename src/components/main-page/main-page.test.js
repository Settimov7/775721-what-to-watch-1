import * as React from 'react';
import renderer from 'react-test-renderer';

import {MainPage} from "./main-page";

it(`Main page correctly renders`, () => {
  const props = {
    filmNames: [`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`],
  };

  const tree = renderer.create(<MainPage {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
