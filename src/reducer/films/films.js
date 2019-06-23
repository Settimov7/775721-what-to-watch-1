export const DEFAULT_DISPLAYED_FILMS_NUMBER = 20;
export const INCREASE_DISPLAYED_FILMS_NUMBER_STEP = 20;

const initialAppState = {
  films: [],
  promoFilm: null,
  displayedFilmsNumber: DEFAULT_DISPLAYED_FILMS_NUMBER,
};

export const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  INCREASE_DISPLAYED_FILMS_NUMBER: `INCREASE_DISPLAYED_FILMS_NUMBER`,
  RESET_DISPLAYED_FILMS_NUMBER: `RESET_DISPLAYED_FILMS_NUMBER`,
  CHANGE_FILM_FAVORITE_STATUS: `CHANGE_FILM_FAVORITE_STATUS`,
};

export const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films.map((film) => transformFilm(film)),
  }),

  loadPromoFilm: (film) => ({
    type: ActionType.LOAD_PROMO_FILM,
    payload: transformFilm(film),
  }),

  increaseDisplayedFilmsNumber: () => ({
    type: ActionType.INCREASE_DISPLAYED_FILMS_NUMBER,
  }),

  resetDisplayedFilmsNumber: () => ({
    type: ActionType.RESET_DISPLAYED_FILMS_NUMBER,
  }),

  changeFilmFavoriteStatus: (film) => ({
    type: ActionType.CHANGE_FILM_FAVORITE_STATUS,
    payload: transformFilm(film),
  })
};

export const Operation = {
  loadFilms: () => (dispatch, _getState, api) =>
    api.get(`/films`)
      .then((response) => dispatch(ActionCreator.loadFilms(response.data))),

  loadPromoFilm: () => (dispatch, _getState, api) =>
    api.get(`/films/promo`)
      .then((response) => dispatch(ActionCreator.loadPromoFilm(response.data))),

  changeFilmFavoriteStatus: (filmId, newStatus) => (dispatch, _getState, api) => {
    const intNewStatus = newStatus ? 1 : 0;

    return api.post(`/favorite/${filmId}/${intNewStatus}`)
      .then((response) => dispatch(ActionCreator.changeFilmFavoriteStatus(response.data)));
  },
};

export const reducer = (appState = initialAppState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ActionType.LOAD_FILMS:
      return Object.assign({}, appState, {
        films: [...payload],
      });

    case (ActionType.LOAD_PROMO_FILM):
      return Object.assign({}, appState, {
        promoFilm: payload,
      });

    case ActionType.INCREASE_DISPLAYED_FILMS_NUMBER:
      return Object.assign({}, appState, {
        displayedFilmsNumber: appState.displayedFilmsNumber + INCREASE_DISPLAYED_FILMS_NUMBER_STEP,
      });

    case ActionType.RESET_DISPLAYED_FILMS_NUMBER:
      return Object.assign({}, appState, {
        displayedFilmsNumber: DEFAULT_DISPLAYED_FILMS_NUMBER,
      });

    case ActionType.CHANGE_FILM_FAVORITE_STATUS: {
      const films = appState.films.map((film) => {
        if (film.id === payload.id) {
          return payload;
        }

        return film;
      });

      let promoFilm = appState.promoFilm;

      if (appState.promoFilm.id === payload.id) {
        promoFilm = Object.assign({}, appState.promoFilm, payload);
      }

      return Object.assign({}, appState, {
        films,
        promoFilm,
      });
    }
  }

  return appState;
};

const transformFilm = (rawFilm) => {
  const {id, name, description, rating, director, genre, released, starring} = rawFilm;

  return {
    id,
    name,
    posterImageSrc: rawFilm[`poster_image`],
    previewImageSrc: rawFilm[`preview_image`],
    backgroundImageSrc: rawFilm[`background_image`],
    backgroundColor: rawFilm[`background_color`],
    description,
    rating,
    scores: rawFilm[`scores_count`],
    director,
    starring,
    runTime: rawFilm[`run_time`],
    genre,
    releasedYear: released,
    isFavorite: rawFilm[`is_favorite`],
    videoSrc: rawFilm[`video_link`],
    previewVideoSrc: rawFilm[`preview_video_link`],
  };
};
