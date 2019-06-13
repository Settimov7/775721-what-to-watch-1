import * as React from 'react';
import {shallow} from 'enzyme';

import {FilterList} from "./filter-list";

it(`Filter list items correctly triggered click event`, () => {
  const onChange = jest.fn();
  const props = {
    properties: [`drama`, `fantastic`, `comedy`],
    activeItem: `drama`,
    onChange,
  };

  const filterList = shallow(<FilterList {...props}/>);
  const filters = filterList.find(`.catalog__genres-link`);

  filters.forEach((filter) => filter.simulate(`click`, {preventDefault() {}}));

  expect(onChange).toHaveBeenCalledTimes(props.properties.length);
});
