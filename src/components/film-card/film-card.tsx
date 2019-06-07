import * as React from 'react';

import {VideoPlayer} from "../video-player/video-player";
import {Film, FilmCardSize} from '../../types';

const DEFAULT_CARD_SIZE: FilmCardSize = {
  width: 280,
  height: 175
};

interface Props {
  film: Film,
  sizes?: FilmCardSize,
}

interface State {
  timerId: number,
  isPreviewPlaying: boolean,
}

export class FilmCard extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      timerId: null,
      isPreviewPlaying: false,
    };

    this._mouseEnterHandler = this._mouseEnterHandler.bind(this);
    this._mouseLeaveHandler = this._mouseLeaveHandler.bind(this);
  }

  render() {
    const {film, sizes = DEFAULT_CARD_SIZE} = this.props;
    const {name, previewImageSrc, videoSrc} = film;
    const {isPreviewPlaying} = this.state;
    const {width, height} = sizes;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._mouseEnterHandler}
        onMouseLeave={this._mouseLeaveHandler}
      >
        <div className="small-movie-card__image">
          <VideoPlayer
            videoSrc={videoSrc}
            posterSrc={previewImageSrc}
            options={
              {
                width,
                height,
              }
            }
            isPlaying={isPreviewPlaying}
          />
        </div>

        <h3 className="small-movie-card__title">
          <a
            className="small-movie-card__link"
            href="movie-page.html"
          >
            {name}
          </a>
        </h3>
      </article>
    );
  }

  _mouseEnterHandler() {
    const timerId = window.setTimeout(() => {
      this.setState({
        isPreviewPlaying: true,
      });
    }, 1000);

    this.setState((state: State): State => ({
      ...state,
      timerId
    }));
  }

  _mouseLeaveHandler() {
    clearTimeout(this.state.timerId);

    this.setState({
      isPreviewPlaying: false,
      timerId: null,
    });
  }
}
