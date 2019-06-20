import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {FilmCard} from "./film-card";
import {BrowserRouter} from 'react-router-dom';

it(`Film card correctly renders`, () => {
  const props = {
    id: 1,
    name: `Film-1`,
    previewImageSrc: `/image.jpg`,
    videoSrc: `video.mp4`,
  };

  const card = renderer.create(
    <BrowserRouter>
      <FilmCard {...props}/>
    </BrowserRouter>
  ).toJSON();

  expect(card).toMatchSnapshot();
});
