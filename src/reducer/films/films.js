import {DEFAULT_DISPLAYED_FILMS_NUMBER, INCREASE_DISPLAYED_FILMS_NUMBER_STEP} from "./constants";

import {transformFilm} from "./utils";

const initialState = {
  films: [],
  promoFilm: null,
  favoriteFilms: [],
  displayedFilmsNumber: DEFAULT_DISPLAYED_FILMS_NUMBER,
};

export const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_FAVORITE_FILMS: `LOAD_FAVORITE_FILMS`,
  INCREASE_DISPLAYED_FILMS_NUMBER: `INCREASE_DISPLAYED_FILMS_NUMBER`,
  RESET_DISPLAYED_FILMS_NUMBER: `RESET_DISPLAYED_FILMS_NUMBER`,
  CHANGE_FILM_FAVORITE_STATUS: `CHANGE_FILM_FAVORITE_STATUS`,
};

export const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),

  loadPromoFilm: (film) => ({
    type: ActionType.LOAD_PROMO_FILM,
    payload: film,
  }),

  loadFavoriteFilms: (films) => ({
    type: ActionType.LOAD_FAVORITE_FILMS,
    payload: films,
  }),

  increaseDisplayedFilmsNumber: () => ({
    type: ActionType.INCREASE_DISPLAYED_FILMS_NUMBER,
  }),

  resetDisplayedFilmsNumber: () => ({
    type: ActionType.RESET_DISPLAYED_FILMS_NUMBER,
  }),

  changeFilmFavoriteStatus: (film) => ({
    type: ActionType.CHANGE_FILM_FAVORITE_STATUS,
    payload: film,
  })
};

export const Operation = {
  loadFilms: () => (dispatch, _getState, api) =>
    api
      .get(`/films`)
      .then((response) => dispatch(ActionCreator.loadFilms(response.data.map((film) => transformFilm(film))))),

  loadPromoFilm: () => (dispatch, _getState, api) =>
    api
      .get(`/films/promo`)
      .then((response) => dispatch(ActionCreator.loadPromoFilm(transformFilm(response.data)))),

  loadFavoriteFilms: () => (dispatch, _getState, api) =>
    api
      .get(`/favorite`)
      .then((response) => dispatch(ActionCreator.loadFavoriteFilms(response.data.map((film) => transformFilm(film))))),

  changeFilmFavoriteStatus: (filmId, newStatus) => (dispatch, _getState, api) => {
    const intNewStatus = newStatus ? 1 : 0;

    return api.post(`/favorite/${filmId}/${intNewStatus}`)
      .then((response) => dispatch(ActionCreator.changeFilmFavoriteStatus(transformFilm(response.data))));
  },
};

export const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ActionType.LOAD_FILMS:
      return Object.assign({}, state, {
        films: [...payload],
      });

    case (ActionType.LOAD_PROMO_FILM):
      return Object.assign({}, state, {
        promoFilm: payload,
      });

    case (ActionType.LOAD_FAVORITE_FILMS):
      return Object.assign({}, state, {
        favoriteFilms: [...payload],
      });

    case ActionType.INCREASE_DISPLAYED_FILMS_NUMBER:
      return Object.assign({}, state, {
        displayedFilmsNumber: state.displayedFilmsNumber + INCREASE_DISPLAYED_FILMS_NUMBER_STEP,
      });

    case ActionType.RESET_DISPLAYED_FILMS_NUMBER:
      return Object.assign({}, state, {
        displayedFilmsNumber: DEFAULT_DISPLAYED_FILMS_NUMBER,
      });

    case ActionType.CHANGE_FILM_FAVORITE_STATUS: {
      const films = state.films.map((film) => {
        if (film.id === payload.id) {
          return payload;
        }

        return film;
      });

      const favoriteFilms = films.filter(({isFavorite}) => isFavorite);

      let promoFilm = state.promoFilm;

      if (state.promoFilm.id === payload.id) {
        promoFilm = Object.assign({}, state.promoFilm, payload);
      }

      return Object.assign({}, state, {
        films,
        favoriteFilms,
        promoFilm,
      });
    }
  }

  return state;
};
