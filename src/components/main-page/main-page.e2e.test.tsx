import * as React from 'react';
import {shallow} from 'enzyme';

import {MainPage} from './main-page';

it(`When component did mount trigger reset displayed films`, () => {
  const onPlayButtonClick = jest.fn();
  const resetDisplayedFilmsNumber = jest.fn();
  const props = {
    isAuthorizationRequired: false,
    userAvatarSrc: `image.jpg`,
    resetDisplayedFilmsNumber,
    onPlayButtonClick,
  };

  shallow(<MainPage {...props} />);

  expect(resetDisplayedFilmsNumber).toHaveBeenCalledTimes(1);
});

it(`On play button click correctly trigger play button handler`, () => {
  const onPlayButtonClick = jest.fn();
  const resetDisplayedFilmsNumber = jest.fn();
  const props = {
    isAuthorizationRequired: false,
    userAvatarSrc: `image.jpg`,
    resetDisplayedFilmsNumber,
    onPlayButtonClick,
  };

  const mainPage = shallow(<MainPage {...props} />);
  const playButton = mainPage.find(`.btn--play`);

  playButton.simulate(`click`, {preventDefault() {}});

  expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
});
