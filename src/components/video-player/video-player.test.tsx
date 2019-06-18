import * as React from "react";
import * as renderer from "react-test-renderer";

import {VideoPlayer} from "./video-player";

it(`Video player correctly renders`, () => {
  const props = {
    videoSrc: `video.mp4`,
    posterSrc: `/image.jpg`,
    size: {
      width: 100,
      height: 100,
    }
  };

  const tree = renderer.create(<VideoPlayer {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
