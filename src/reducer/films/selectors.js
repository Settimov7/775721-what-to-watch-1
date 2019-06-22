import {createSelector} from 'reselect';

import {NameSpace} from "../name-spaces";
import {getCurrentFilter} from "../filter/selectors";

const NAME_SPACE = NameSpace.FILMS;

export const getFilmsGenres = (state) => state[NAME_SPACE].films.map((film) => film.genre);

export const getFilms = (state) => state[NAME_SPACE].films;

export const getFilteredFilms = createSelector(
    getFilms,
    getCurrentFilter,
    (films, filterByGenre) => {
      if (filterByGenre === `all`) {
        return films;
      }

      return films.filter(({genre}) => genre === filterByGenre);
    }
);

export const getFilmById = (state, id) => state[NAME_SPACE].films.find((film) => film.id === id);

export const getCurrentFilmId = (state, props) => parseInt(props.match.params.id, 10);

export const getCurrentFilm = createSelector(
    getFilms,
    getCurrentFilmId,
    (films, id) => films.find((film) => film.id === id)
);

export const getCurrentFilmName = createSelector(
    getCurrentFilm,
    (film) => film.name
);

export const getCurrentFilmBackgroundImage = createSelector(
    getCurrentFilm,
    (film) => film.backgroundImageSrc
);

export const getCurrentFilmPoster = createSelector(
    getCurrentFilm,
    (film) => film.posterImageSrc
);

export const getCurrentFilmBackgroundColor = createSelector(
    getCurrentFilm,
    (film) => film.backgroundColor
);

export const getSameFilmsByGenre = (state, originalFilm, maxCount) => {
  const sameFilms = state[NAME_SPACE].films.filter((film) => film.genre === originalFilm.genre);
  const originalFilmIndex = sameFilms.indexOf(originalFilm);

  sameFilms.splice(originalFilmIndex, 1);

  return sameFilms.slice(0, maxCount);
};


const getDisplayedFilmsNumber = (state) => state[NAME_SPACE].displayedFilmsNumber;

export const getDisplayedFilms = createSelector(
    getFilteredFilms,
    getDisplayedFilmsNumber,
    (filteredFilms, displayedFilmsNumber) => filteredFilms.slice(0, displayedFilmsNumber)
);

const getFilteredFilmsLength = createSelector(
    getFilteredFilms,
    (filteredFilms) => filteredFilms.length
);

export const getIsVisibleShowMoreButton = createSelector(
    getFilteredFilmsLength,
    getDisplayedFilmsNumber,
    (filteredFilmsLength, displayedFilmsNumber) => filteredFilmsLength > displayedFilmsNumber
);

export const getPromoFilm = (state) => state[NAME_SPACE].promoFilm;
