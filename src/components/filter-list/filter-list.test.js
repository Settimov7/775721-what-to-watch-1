import * as React from 'react';
import renderer from 'react-test-renderer';
import {FilterList} from "./filter-list";

it(`Filters list correctly renders`, () => {
  const props = {
    properties: [`drama`, `fantastic`, `comedy`],
    currentFilter: `drama`,
    changeCurrentFilter: jest.fn(),
  };

  const tree = renderer.create(<FilterList {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
