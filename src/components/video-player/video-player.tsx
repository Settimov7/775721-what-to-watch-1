import * as React from 'react';

import {VideoOptions} from "../../types";

interface Props {
  isPlaying?: boolean,
  videoSrc: string,
  posterSrc: string
  options: VideoOptions,
}

interface State {
  isPlaying: boolean,
}

export class VideoPlayer extends React.PureComponent<Props, State> {
  private _videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props) {
    super(props);

    this._videoRef = React.createRef();

    this.state = {
      isPlaying: false,
    };
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    this._updateIsPlayingFromProps();

    if (this.state.isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }

  render() {
    const {videoSrc, posterSrc, options} = this.props;
    const {width, height, isMuted = true, isLoop = true} = options;

    return (
      <video
        ref={this._videoRef}
        src={videoSrc}
        poster={posterSrc}
        width={width}
        height={height}
        loop={isLoop}
        muted={isMuted}
      />
    );
  }

  _updateIsPlayingFromProps() {
    const {isPlaying} = this.props;

    this.setState({
      isPlaying,
    });
  }
}
