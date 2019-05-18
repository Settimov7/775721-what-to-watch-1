import * as React from 'react';
import * as PropTypes from 'prop-types';

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

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    posterSrc: PropTypes.string,
  })).isRequired,
};
