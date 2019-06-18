import * as React from 'react';

import {FilmPlayer} from '../../components/film-player/film-player';

interface State {
  isFilmPlayerActive: boolean,
}

export const withFilmPlayer = (Component) => {
  type Props = React.ComponentProps<typeof Component>;

  class WithFilmPlayer extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        isFilmPlayerActive: false,
      };

      this._activateFilmPlayer = this._activateFilmPlayer.bind(this);
      this._disableFilmPlayer = this._disableFilmPlayer.bind(this);
    }

    render() {
      const {isFilmPlayerActive} = this.state;

      if(isFilmPlayerActive) {
        const {film} = this.props;
        const {name, previewImageSrc, videoSrc} = film;

        return <FilmPlayer
          name={name}
          previewImageSrc={previewImageSrc}
          videoSrc={videoSrc}
          onCloseClick={this._disableFilmPlayer}
        />;
      }

      return <Component
        {...this.props}
        onPlayButtonClick={this._activateFilmPlayer}
      />;
    }

    _activateFilmPlayer() {
      this.setState({
        isFilmPlayerActive: true,
      });
    }

    _disableFilmPlayer() {
      this.setState({
        isFilmPlayerActive: false,
      });
    }
  }

  return WithFilmPlayer;
};
