export const DEFAULT_DISPLAYED_FILMS_NUMBER = 20;
export const INCREASE_DISPLAYED_FILMS_NUMBER_STEP = 20;

const initialAppState = {
  films: [],
  displayedFilmsNumber: DEFAULT_DISPLAYED_FILMS_NUMBER,
};

export const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  INCREASE_DISPLAYED_FILMS_NUMBER: `INCREASE_DISPLAYED_FILMS_NUMBER`,
  RESET_DISPLAYED_FILMS_NUMBER: `RESET_DISPLAYED_FILMS_NUMBER`,
};

export const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: transformFilms(films),
  }),

  increaseDisplayedFilmsNumber: () => ({
    type: ActionType.INCREASE_DISPLAYED_FILMS_NUMBER,
  }),

  resetDisplayedFilmsNumber: () => ({
    type: ActionType.RESET_DISPLAYED_FILMS_NUMBER,
  })
};

export const Operation = {
  loadFilms: () => (dispatch, _getState, api) =>
    api.get(`/films`)
      .then((response) => dispatch(ActionCreator.loadFilms(response.data))),
};

export const reducer = (appState = initialAppState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ActionType.LOAD_FILMS:
      return Object.assign({}, appState, {
        films: [...payload],
      });

    case ActionType.INCREASE_DISPLAYED_FILMS_NUMBER:
      return Object.assign({}, appState, {
        displayedFilmsNumber: appState.displayedFilmsNumber + INCREASE_DISPLAYED_FILMS_NUMBER_STEP,
      });

    case ActionType.RESET_DISPLAYED_FILMS_NUMBER:
      return Object.assign({}, appState, {
        displayedFilmsNumber: DEFAULT_DISPLAYED_FILMS_NUMBER,
      });
  }

  return appState;
};

const transformFilms = (rawFilms) => rawFilms.map((rawFilm) => {
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
});
