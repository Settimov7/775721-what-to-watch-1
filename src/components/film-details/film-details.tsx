import * as React from 'react';
import {connect} from 'react-redux';

import {FilmsList} from '../films-list/films-list';
import {Film} from '../../types';
import {Footer} from '../footer/footer';
import FullFilmCard from '../full-film-card/full-film-card';

import {getSameFilmsByGenre} from '../../reducer/films/selectors';

interface Props {
  film: Film,
  onPlayButtonClick: () => void,
  sameGenreFilms: Film[],
}

const MAX_SAME_FILMS = 4;

export const FilmDetails = (props: Props) => {
  const {film, onPlayButtonClick, sameGenreFilms} = props;

  return (
    <React.Fragment>
      <FullFilmCard film={film} onPlayButtonClick={onPlayButtonClick}/>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__movies-list">
            <FilmsList films={sameGenreFilms} displayedFilmsNumber={MAX_SAME_FILMS}/>
          </div>
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {film} = ownProps;

  return {
    sameGenreFilms: getSameFilmsByGenre(state, film, MAX_SAME_FILMS),
  }
};

export default connect(mapStateToProps)(FilmDetails);
