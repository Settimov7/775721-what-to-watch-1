import * as React from "react";
import * as renderer from "react-test-renderer";

import {FilmPlayer} from './film-player';

it(`Film player correctly renders`, () => {
  const props = {
    name: `Film-1`,
    previewImageSrc: `/image.jpg`,
    videoSrc: `video.mp4`,
    onCloseClick: jest.fn(),
  };

  const player = renderer.create(<FilmPlayer {...props}/>).toJSON();

  expect(player).toMatchSnapshot();
});
