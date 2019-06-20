import * as React from 'react';
import {shallow} from 'enzyme';

import {FilmPlayer} from './film-player';

it(`On play button click correctly change state`, () => {
  const onCloseClick = jest.fn();
  const props = {
    name: `Film-1`,
    previewImageSrc: `/image.jpg`,
    videoSrc: `video.mp4`,
    onCloseClick,
  };

  FilmPlayer.prototype.componentDidUpdate = jest.fn();

  const filmPlayer = shallow(<FilmPlayer {...props} />);
  const playButton = filmPlayer.find(`.player__play`);

  playButton.simulate(`click`, {preventDefault() {}});

  expect(filmPlayer.state()).toEqual({
    isPlaying: true,
    currentTime: null,
    duration: null,
    remainingDuration: null,
    progressFilmInPercent: `0`,
  });
});

it(`On pause button click correctly change state`, () => {
  const onCloseClick = jest.fn();
  const props = {
    name: `Film-1`,
    previewImageSrc: `/image.jpg`,
    videoSrc: `video.mp4`,
    onCloseClick,
  };

  FilmPlayer.prototype.componentDidUpdate = jest.fn();

  const filmPlayer = shallow(<FilmPlayer {...props} />);
  const playButton = filmPlayer.find(`.player__play`);

  filmPlayer.setState({
    isPlaying: true,
    currentTime: null,
    duration: null,
    remainingDuration: null,
    progressFilmInPercent: `0`,
  });
  playButton.simulate(`click`, {preventDefault() {}});

  expect(filmPlayer.state()).toEqual({
    isPlaying: false,
    currentTime: null,
    duration: null,
    remainingDuration: null,
    progressFilmInPercent: `0`,
  });
});

it(`On pause button click correctly change state`, () => {
  const onCloseClick = jest.fn();
  const props = {
    name: `Film-1`,
    previewImageSrc: `/image.jpg`,
    videoSrc: `video.mp4`,
    onCloseClick,
  };

  FilmPlayer.prototype.componentDidUpdate = jest.fn();

  const filmPlayer = shallow(<FilmPlayer {...props} />);
  const playButton = filmPlayer.find(`.player__play`);

  filmPlayer.setState({
    isPlaying: true,
    currentTime: null,
    duration: null,
    remainingDuration: null,
    progressFilmInPercent: `0`,
  });
  playButton.simulate(`click`, {preventDefault() {}});

  expect(filmPlayer.state()).toEqual({
    isPlaying: false,
    currentTime: null,
    duration: null,
    remainingDuration: null,
    progressFilmInPercent: `0`,
  });
});

it(`When video can play change state correctly`, () => {
  const DURATION = 1000;
  const onCloseClick = jest.fn();
  const props = {
    name: `Film-1`,
    previewImageSrc: `/image.jpg`,
    videoSrc: `video.mp4`,
    onCloseClick,
  };

  FilmPlayer.prototype.componentDidUpdate = jest.fn();

  const filmPlayer = shallow(<FilmPlayer {...props} />);
  const video = filmPlayer.find(`video`);

  video.simulate(`canPlayThrough`, {
    target: {
      duration: DURATION,
    },
  });

  expect(filmPlayer.state()).toEqual({
    isPlaying: false,
    currentTime: null,
    duration: DURATION,
    remainingDuration: null,
    progressFilmInPercent: `0`,
  });
});

it(`When video can play change state correctly`, () => {
  const DURATION = 1000;
  const CURRENT_TIME = 300;
  const REMAINING_DURATION = DURATION - CURRENT_TIME;
  const PROGRESS_FILM_IN_PERCENT = (CURRENT_TIME / DURATION * 100).toFixed(2);

  const onCloseClick = jest.fn();
  const props = {
    name: `Film-1`,
    previewImageSrc: `/image.jpg`,
    videoSrc: `video.mp4`,
    onCloseClick,
  };

  FilmPlayer.prototype.componentDidUpdate = jest.fn();

  const filmPlayer = shallow(<FilmPlayer {...props} />);
  const video = filmPlayer.find(`video`);

  video.simulate(`timeUpdate`, {
    target: {
      currentTime: CURRENT_TIME,
      duration: DURATION,
    },
  });

  expect(filmPlayer.state()).toEqual({
    isPlaying: false,
    currentTime: CURRENT_TIME,
    duration: null,
    remainingDuration: REMAINING_DURATION,
    progressFilmInPercent: PROGRESS_FILM_IN_PERCENT,
  });
});

it(`On full screen button correctly trigger click handler`, () => {
  const onCloseClick = jest.fn();
  const fullScreenClickHandler = jest.fn();
  const props = {
    name: `Film-1`,
    previewImageSrc: `/image.jpg`,
    videoSrc: `video.mp4`,
    onCloseClick,
  };

  FilmPlayer.prototype.componentDidUpdate = jest.fn();
  FilmPlayer.prototype._fullScreenClickHandler = fullScreenClickHandler;

  const filmPlayer = shallow(<FilmPlayer {...props} />);
  const fullScreenButton = filmPlayer.find(`.player__full-screen`);

  fullScreenButton.simulate(`click`, {preventDefault(){}});

  expect(fullScreenClickHandler).toHaveBeenCalledTimes(1);
});
