import * as React from 'react';
import {connect} from 'react-redux';

import {FilmPlayer} from '../../components/film-player/film-player';
import {getFilmById} from '../../reducer/films/selectors';

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

        return <FilmPlayer
          film={film}
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

  const mapStateToProps = (state, ownProps) => {
    const filmId = parseInt(ownProps.match.params.id);

    return {
      film: getFilmById(state, filmId),
    }
  };

  return connect(mapStateToProps)(WithFilmPlayer);
};
