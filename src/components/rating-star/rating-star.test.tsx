import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {RatingStar} from './rating-star';

it(`Rating correctly renders`, () => {
  const onClick = jest.fn();
  const props = {
    value: 3,
    isChecked: true,
    onClick,
  };
  const ratingStar = renderer.create(
    <RatingStar {...props}/>
  ).toJSON();

  expect(ratingStar).toMatchSnapshot();
});
