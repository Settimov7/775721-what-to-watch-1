import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {FilmsList} from "./films-list";
import {BrowserRouter} from 'react-router-dom';

const mock = {
  films: Array(5).fill(null).map((film, index) => ({
    id: index + 1,
    name: `Film-${index + 1}`,
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
  })),
};

it(`Films list correctly renders`, () => {
  const props = {
    films: mock.films,
  };

  const tree = renderer.create(
    <BrowserRouter>
      <FilmsList {...props}/>
    </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
