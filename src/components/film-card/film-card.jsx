import * as React from 'react';
import * as PropTypes from 'prop-types';

import {VideoPlayer} from "../video-player/video-player";

const SIZES = {
  width: 280,
  height: 175
};

export class FilmCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this._filmCardRef = React.createRef();

    this.state = {
      timerId: null,
      isPreviewPlaying: false,
    };

    this._mouseEnterHandler = this._mouseEnterHandler.bind(this);
    this._mouseLeaveHandler = this._mouseLeaveHandler.bind(this);
  }

  render() {
    const {film, sizes = SIZES, onTitleClick} = this.props;
    const {title, posterSrc, videoSrc} = film;
    const {isPreviewPlaying} = this.state;
    const {width, height} = sizes;

    return (
      <article
        ref={this._filmCardRef}
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._mouseEnterHandler}
        onMouseLeave={this._mouseLeaveHandler}
      >
        <div className="small-movie-card__image">
          <VideoPlayer
            videoSrc={videoSrc}
            posterSrc={posterSrc}
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
            onClick={onTitleClick}
          >
            {title}
          </a>
        </h3>
      </article>
    );
  }

  _mouseEnterHandler() {
    const timerId = setTimeout(() => {
      this.setState({
        isPreviewPlaying: true,
      });
    }, 1000);

    this.setState({
      timerId
    });
  }

  _mouseLeaveHandler() {
    clearTimeout(this.state.timerId);

    this.setState({
      isPreviewPlaying: false,
      timerId: null,
    });
  }
}

FilmCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    posterSrc: PropTypes.string.isRequired,
  }),
  sizes: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  onTitleClick: PropTypes.func,
};
