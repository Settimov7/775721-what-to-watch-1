import * as React from 'react';
import * as PropTypes from 'prop-types';

import {FilmCard} from "../film-card/film-card";

export class FilmsList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeFilmId: null,
    };
  }

  render() {
    const {films} = this.props;

    return (
      <div
        className="catalog__movies-list"
      >
        {films.map((film) => <FilmCard
          key={film.id}
          film={film}
          onPlayClick={() => this.state.activeFilmId}
          onMouseEnter={(id) => this.setState({
            activeFilmId: id,
          })}
        />)}
      </div>
    );
  }
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    posterSrc: PropTypes.string,
  })).isRequired,
};
