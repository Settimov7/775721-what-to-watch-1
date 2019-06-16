import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {ShowMoreButton} from './show-more-button';

it(`Show more button correctly renders when is visible`, () => {
  const props = {
    onClick: jest.fn(),
    isVisible: true,
  };

  const showMoreButton = renderer.create(<ShowMoreButton {...props}/>).toJSON();

  expect(showMoreButton).toMatchSnapshot();
});

it(`Show more button correctly renders when is not visible`, () => {
  const props = {
    onClick: jest.fn(),
    isVisible: false,
  };

  const showMoreButton = renderer.create(<ShowMoreButton {...props}/>).toJSON();

  expect(showMoreButton).toMatchSnapshot();
});
