import renderer from "react-test-renderer";
import * as React from "react";

import {VideoPlayer} from "./video-player";

const mock = {
  film: {
    id: 2,
    title: `Bohemian Rhapsody`,
    posterSrc: `poster.jpg`,
    videoSrc: `video.mp4`,
  },
};

it(`Video player correctly renders`, () => {
  const props = {
    videoSrc: mock.film.videoSrc,
    posterSrc: mock.film.posterSrc,
    options: {
      width: 100,
      height: 100,
    }
  };

  const tree = renderer.create(<VideoPlayer {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
