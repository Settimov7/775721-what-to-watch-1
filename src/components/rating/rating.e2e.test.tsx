import * as React from 'react';
import {shallow} from 'enzyme';

import {Rating} from './rating';

it(`On change rating correctly change state`, () => {
  const onChange = jest.fn();
  const props = {
    max: 5,
    onChange,
  };
  const newValue = 5;
  const rating = shallow(<Rating {...props} />);

  rating.instance()._handleRatingElementClick({
    target: {
      value: newValue,
    }
  });

  expect(rating.state().value).toEqual(newValue);
});

it(`On change rating trigger handler`, () => {
  const onChange = jest.fn();
  const props = {
    max: 5,
    onChange,
  };

  const rating = shallow(<Rating {...props} />);

  rating.instance()._handleRatingElementClick({
    target: {
      value: 5,
    }
  });

  expect(onChange).toHaveBeenCalledTimes(1);
});
