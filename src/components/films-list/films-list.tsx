import * as React from 'react';
import {connect} from 'react-redux';

import {FilmCard} from '../film-card/film-card';
import {getDisplayedFilms} from '../../reducer/films/selectors';
import {Film} from '../../types';

interface Props {
  films: Film[],
  displayedFilmsNumber?: number,
}

export const FilmsList = (props: Props) => {
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
  films: getDisplayedFilms(state),
});

export default connect(mapStateToProps)(FilmsList);
