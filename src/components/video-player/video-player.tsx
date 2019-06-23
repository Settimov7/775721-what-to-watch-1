import * as React from 'react';

import {Size} from '../../types';

interface Props {
  videoSrc: string,
  posterSrc: string,
  size: Size,
}

export const VideoPlayer: React.FunctionComponent<Props> = (props) => {
  const {videoSrc, posterSrc, size} = props;
  const {width, height} = size;

  return (
    <video
      width={width}
      height={height}
      src={videoSrc}
      poster={posterSrc}
      autoPlay
      muted
      loop
    />
  );
};
