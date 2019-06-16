import * as React from 'react';
import {shallow} from 'enzyme';

import {ShowMoreButton} from './show-more-button';

it(`Show more button correctly triggered mouse click handler`, () => {
  const onClick = jest.fn();
  const props = {
    onClick,
    isVisible: true,
  };

  const showMoreButton = shallow(<ShowMoreButton {...props}/>);
  const button = showMoreButton.find(`button`);

  button.simulate(`click`, {preventDefault() {}});

  expect(onClick).toHaveBeenCalledTimes(1);
});
