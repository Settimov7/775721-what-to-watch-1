import * as React from 'react';
import {Link} from 'react-router-dom';

import {VideoPlayer} from '../video-player/video-player';
import {Film, Size} from '../../types';
import {history} from '../../history';

const CARD_SIZE: Size = {
  width: 280,
  height: 175
};

interface Props {
  film: Film,
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
    this._clickHandler = this._clickHandler.bind(this);
  }

  componentWillUnmount(): void {
    clearTimeout(this.state.timerId);
  }

  render() {
    const {film} = this.props;
    const {id, name, previewImageSrc, videoSrc} = film;
    const {isPreviewPlaying} = this.state;
    const {width, height} = CARD_SIZE;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._mouseEnterHandler}
        onMouseLeave={this._mouseLeaveHandler}
      >
        <div className="small-movie-card__image" onClick={this._clickHandler}>
          {isPreviewPlaying ?
            <VideoPlayer
              videoSrc={videoSrc}
              posterSrc={previewImageSrc}
              size={CARD_SIZE}
            /> :
            <img src={previewImageSrc} alt={name} width={width} height={height} />
          }
        </div>

        <h3 className="small-movie-card__title">
          <Link to={`/film/${id}`} className="small-movie-card__link">
            {name}
          </Link>
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

  _clickHandler(evt) {
    evt.preventDefault();

    const {isPreviewPlaying} = this.state;

    if(!isPreviewPlaying) {
      history.push(`/film/${this.props.film.id}`);
    }
  }
}
