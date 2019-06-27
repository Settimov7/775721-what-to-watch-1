import * as React from 'react';
import {Link} from 'react-router-dom';

import {VideoPlayer} from '../video-player/video-player';

import {CARD_SIZE} from './constants';

import {history} from '../../history';

interface Props {
  id: number,
  name: string,
  previewImageSrc: string,
  videoSrc: string,
}

interface State {
  timerId: number,
  isPreviewPlaying: boolean,
}

export class SmallFilmCard extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      timerId: null,
      isPreviewPlaying: false,
    };

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  componentWillUnmount(): void {
    clearTimeout(this.state.timerId);
  }

  render() {
    const {id, name, previewImageSrc, videoSrc} = this.props;
    const {isPreviewPlaying} = this.state;
    const {width, height} = CARD_SIZE;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
      >
        <div className="small-movie-card__image" onClick={this._handleClick}>
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

  _handleMouseEnter() {
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

  _handleMouseLeave() {
    clearTimeout(this.state.timerId);

    this.setState({
      isPreviewPlaying: false,
      timerId: null,
    });
  }

  _handleClick(evt) {
    evt.preventDefault();

    const {id} = this.props;
    const {isPreviewPlaying} = this.state;

    if(!isPreviewPlaying) {
      history.push(`/film/${id}`);
    }
  }
}
