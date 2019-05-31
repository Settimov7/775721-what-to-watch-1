import * as React from 'react';
import * as PropTypes from 'prop-types';
import {connect} from "react-redux";

import {FilmCard} from "../film-card/film-card";
import {getFilteredFilms} from "../../reducer/films/selectors";

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

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  films: getFilteredFilms(state),
});

export default connect(mapStateToProps)(FilmsList);

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    posterImageSrc: PropTypes.string,
    previewImageSrc: PropTypes.string,
    backgroundImageSrc: PropTypes.string,
    backgroundColor: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    scores: PropTypes.number,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    runTime: PropTypes.number,
    genre: PropTypes.string,
    releasedYear: PropTypes.number,
    isFavorite: PropTypes.bool,
    videoSrc: PropTypes.string,
    previewVideoSrc: PropTypes.string,
  })).isRequired,
};
