import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {FilterList} from "./filter-list";

it(`Filters list correctly renders`, () => {
  const props = {
    properties: [`Filter-1`, `Filter-2`, `Filter-3`, `Filter-4`, `Filter-5`, `Filter-6`, `Filter-7`, `Filter-8`, `Filter-9`, `Filter-10`, `Filter-11`],
    activeItem: `Filter-1`,
    onChange: jest.fn(),
  };

  const tree = renderer.create(<FilterList {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
