import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {SmallFilmCard} from "./small-film-card";
import {BrowserRouter} from 'react-router-dom';

it(`Small film card correctly renders`, () => {
  const props = {
    id: 1,
    name: `Film-1`,
    previewImageSrc: `/image.jpg`,
    videoSrc: `video.mp4`,
  };

  const card = renderer.create(
    <BrowserRouter>
      <SmallFilmCard {...props}/>
    </BrowserRouter>
  ).toJSON();

  expect(card).toMatchSnapshot();
});
