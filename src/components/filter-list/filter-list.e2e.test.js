import * as React from 'react';
import {shallow} from 'enzyme';

import {FilterList} from "./filter-list";

it(`Filter list correctly render filters`, () => {
  const onClick = jest.fn();
  const props = {
    properties: [`drama`, `fantastic`, `comedy`],
    currentFilter: `drama`,
    changeCurrentFilter: onClick,
  };
  const filterList = shallow(<FilterList {...props}/>);
  const filters = filterList.find(`.catalog__genres-link`);

  expect(filters).toHaveLength(props.properties.length + 1);
});

it(`Filter list items correctly triggered click event`, () => {
  const onClick = jest.fn();
  const props = {
    properties: [`drama`, `fantastic`, `comedy`],
    currentFilter: `drama`,
    changeCurrentFilter: onClick,
  };

  const filterList = shallow(<FilterList {...props}/>);
  const filters = filterList.find(`.catalog__genres-link`);

  filters.forEach((filter) => filter.simulate(`click`, {preventDefault() {}}));

  expect(onClick).toHaveBeenCalledTimes(props.properties.length);
});
