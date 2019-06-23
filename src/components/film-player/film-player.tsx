import * as React from 'react';
import * as moment from 'moment';

import {SvgSprite} from '../svg-sprite/svg-sprite';

interface Props {
  name: string,
  previewImageSrc: string,
  videoSrc: string,
  onCloseClick: () => void,
}

interface State {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  remainingDuration: number;
  progressFilmInPercent: string;
}

export class FilmPlayer extends React.PureComponent <Props, State> {
  private readonly _videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props) {
    super(props);

    this._videoRef = React.createRef();

    this.state = {
      isPlaying: false,
      currentTime: null,
      duration: null,
      remainingDuration: null,
      progressFilmInPercent: `0`,
    };

    this._playButtonClickHandler = this._playButtonClickHandler.bind(this);
    this._timeUpdateHandler = this._timeUpdateHandler.bind(this);
    this._setFilmDuration = this._setFilmDuration.bind(this);
    this._fullScreenClickHandler = this._fullScreenClickHandler.bind(this);
  }

  get formattedDuration() {
    const {duration, remainingDuration} = this.state;
    const momentDuration = moment.duration(remainingDuration || duration, `seconds`);

    return `${momentDuration.hours()}:${momentDuration.minutes()}:${momentDuration.seconds()}`;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.state.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  render() {
    const {name, previewImageSrc, videoSrc, onCloseClick} = this.props;
    const {isPlaying, progressFilmInPercent} = this.state;

    return(
      <React.Fragment>
        <SvgSprite />

        <div className="player">
          <video
            ref={this._videoRef}
            className="player__video"
            src={videoSrc}
            poster={previewImageSrc}
            onCanPlayThrough={this._setFilmDuration}
            onTimeUpdate={this._timeUpdateHandler}
          />

          <button
            type="button"
            className="player__exit"
            onClick={(evt) => {
              evt.preventDefault();

              onCloseClick();
            }}
          >
            Exit
          </button>

          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress
                  className="player__progress"
                  value={progressFilmInPercent}
                  max="100"
                />

                <div
                  className="player__toggler"
                  style={{left: `${progressFilmInPercent}%`}}
                >
                  Toggler
                </div>
              </div>
              <div className="player__time-value">{this.formattedDuration}</div>
            </div>

            <div className="player__controls-row">
              <button
                className="player__play"
                type="button"
                onClick={this._playButtonClickHandler}
              >
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref={isPlaying ? '#pause' : '#play-s'}/>
                </svg>
                <span>Pause</span>
              </button>

              <div className="player__name">{name}</div>

              <button
                className="player__full-screen"
                type="button"
                onClick={this._fullScreenClickHandler}
              >
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen" />
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  _playButtonClickHandler(evt) {
    evt.preventDefault();

    this.setState((onwState) => ({
      isPlaying: !onwState.isPlaying,
    }))
  }

  _timeUpdateHandler(evt) {
    const currentTime = Math.round(evt.target.currentTime);
    const duration = Math.round(evt.target.duration);
    const remainingDuration = FilmPlayer._getRemainingDuration(duration, currentTime);
    const progressFilmInPercent = FilmPlayer._getProgressFilmInPercent(duration, currentTime);

    this.setState({
      currentTime,
      remainingDuration,
      progressFilmInPercent,
    });
  }

  _setFilmDuration(evt) {
    const duration = Math.round(evt.target.duration);

    this.setState({
      duration,
    })
  };

  _fullScreenClickHandler(evt) {
    evt.preventDefault();

    const video = this._videoRef.current;

    video.requestFullscreen();
  }

  static _getRemainingDuration(duration: number, currentTime: number): number {
    return duration - currentTime;
  }

  static _getProgressFilmInPercent(duration: number, currentTime: number): string {
    return (currentTime / duration * 100).toFixed(2);
  }
}
