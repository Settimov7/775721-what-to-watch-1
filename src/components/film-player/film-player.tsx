import * as React from 'react';
import * as moment from 'moment';

import {Film} from '../../types';

interface Props {
  film: Film,
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
    const {film, onCloseClick} = this.props;
    const {isPlaying, progressFilmInPercent} = this.state;
    const {name, previewImageSrc, videoSrc} = film;

    return(
      <React.Fragment>
        <div className="visually-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <symbol id="add" viewBox="0 0 19 20">
              <title>+</title>
              <desc>Created with Sketch.</desc>
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <polygon id="+" fill="#EEE5B5"
                         points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859"/>
              </g>
            </symbol>
            <symbol id="full-screen" viewBox="0 0 27 27">
              <path fillRule="evenodd" clipRule="evenodd" d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z"
                    fill="#FFF9D9" fillOpacity="0.7"/>
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z" fill="#FFF9D9" fillOpacity="0.7"/>
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z" fill="#FFF9D9"
                    fillOpacity="0.7"/>
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z" fill="#FFF9D9"
                    fillOpacity="0.7"/>
            </symbol>
            <symbol id="in-list" viewBox="0 0 18 14">
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z"
                    fill="#EEE5B5"/>
            </symbol>
            <symbol id="pause" viewBox="0 0 14 21">
              <title>Artboard</title>
              <desc>Created with Sketch.</desc>
              <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <polygon id="Line" fill="#EEE5B5" fillRule="nonzero"
                         points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"/>
                <polygon id="Line" fill="#EEE5B5" fillRule="nonzero"
                         points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"/>
              </g>
            </symbol>
            <symbol id="play-s" viewBox="0 0 19 19">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5"/>
            </symbol>
          </svg>
        </div>

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
    const remainingDuration = duration - currentTime;
    const progressFilmInPercent = (currentTime / duration * 100).toFixed(2);

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
}
