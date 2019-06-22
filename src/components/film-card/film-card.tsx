import * as React from 'react';
import {connect} from 'react-redux';

import {SvgSprite} from '../svg-sprite/svg-sprite';
import {Logo} from '../logo/logo';
import UserBlock from '../user-block/user-block';

import {Operation} from '../../reducer/films/films';

import {Film} from '../../types';

interface Props {
  film: Film;
  onPlayButtonClick: () => void;
}

export const FilmCard: React.FunctionComponent<Props> = (props) => {
  const {film, onPlayButtonClick} = props;
  const {name, backgroundImageSrc, genre, releasedYear, posterImageSrc} = film;

  return (
    <React.Fragment>
      <SvgSprite />

      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={backgroundImageSrc} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <Logo />

          <UserBlock />
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={posterImageSrc} alt={name} width="218"
                   height="327"/>
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{releasedYear}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={(evt) => {
                  evt.preventDefault();

                  onPlayButtonClick();
                }}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </button>

                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"/>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onAddFilmToFavorites: (filmId): void => {
    dispatch(Operation.changeFilmFavoriteStatus(filmId, true))
  }
});

export default connect(null, mapDispatchToProps)(FilmCard);
