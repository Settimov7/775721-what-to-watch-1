import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {FilterList} from "./filter-list";

it(`Filters list correctly renders`, () => {
  const props = {
    properties: [`Drama`, `Fantasy`, `Comedy`],
    activeItem: `Drama`,
    onChange: jest.fn(),
  };

  const tree = renderer.create(<FilterList {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
