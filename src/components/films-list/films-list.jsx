import * as React from 'react';
import * as PropTypes from 'prop-types';
import {connect} from "react-redux";

import {FilmCard} from "../film-card/film-card";

export const FilmsList = (props) => {
  const {films} = props;

  return (
    <div
      className="catalog__movies-list"
    >
      {films.map((film) => <FilmCard
        key={film.id}
        film={film}
      />)}
    </div>
  );
};

const filterFilms = (state) => {
  const {films, currentFilterByFilmGenre} = state;

  if (currentFilterByFilmGenre === `all`) {
    return films;
  }

  return films.filter(({genre}) => genre === currentFilterByFilmGenre);
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  films: filterFilms(state),
});

export default connect(mapStateToProps)(FilmsList);

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string,
    posterSrc: PropTypes.string,
    videoSrc: PropTypes.string,
  })).isRequired,
};
