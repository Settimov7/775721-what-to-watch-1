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
