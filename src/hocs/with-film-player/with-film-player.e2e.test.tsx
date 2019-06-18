import * as React from 'react';
import {shallow} from 'enzyme';

import {withFilmPlayer} from './with-film-player';

const MockComponent = () => <div />;
const WrappedMockComponent = withFilmPlayer(MockComponent);

it(`Should active film player`, () => {
  const props = {
    film: {
      id: 1,
      name: `Film-1`,
      posterImageSrc: `/image.jpg`,
      previewImageSrc: `/image.jpg`,
      backgroundImageSrc: `/image.jpg`,
      backgroundColor: `#123456`,
      description: `description`,
      rating: 5,
      scores: 123456,
      director: `director`,
      starring: [`person-1`, `person-2`, `person-3`],
      runTime: 99,
      genre: `Genre`,
      releasedYear: 2019,
      isFavorite: false,
      videoSrc: `video.mp4`,
      previewVideoSrc: `video.mp4`,
    },
  };
  const wrappedComponent = shallow(<WrappedMockComponent {...props} />);

  wrappedComponent.instance()._activateFilmPlayer();
  wrappedComponent.update();

  expect(wrappedComponent.state().isFilmPlayerActive).toEqual(true);
});

it(`Should disable film player`, () => {
  const props = {
    film: {
      id: 1,
      name: `Film-1`,
      posterImageSrc: `/image.jpg`,
      previewImageSrc: `/image.jpg`,
      backgroundImageSrc: `/image.jpg`,
      backgroundColor: `#123456`,
      description: `description`,
      rating: 5,
      scores: 123456,
      director: `director`,
      starring: [`person-1`, `person-2`, `person-3`],
      runTime: 99,
      genre: `Genre`,
      releasedYear: 2019,
      isFavorite: false,
      videoSrc: `video.mp4`,
      previewVideoSrc: `video.mp4`,
    },
  };
  const wrappedComponent = shallow(<WrappedMockComponent {...props}/>);

  wrappedComponent.instance()._disableFilmPlayer();
  wrappedComponent.update();

  expect(wrappedComponent.state().isFilmPlayerActive).toEqual(false);
});
