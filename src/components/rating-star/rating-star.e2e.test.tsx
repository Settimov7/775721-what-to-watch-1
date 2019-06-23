import * as React from 'react';
import {shallow} from 'enzyme';

import {RatingStar} from './rating-star';

it(`On click rating star trigger handler`, () => {
  const onClick = jest.fn();
  const props = {
    value: 3,
    isChecked: true,
    onClick,
  };

  const ratingStar = shallow(<RatingStar {...props} />);

  const ratingStarInput = ratingStar.find(`.rating__input`);

  ratingStarInput.simulate(`click`, {preventDefault(){}});

  expect(onClick).toHaveBeenCalledTimes(1);
});
