const initialAppState = {
  currentFilterByFilmGenre: `all`,
};

export const ActionType = {
  CHANGE_CURRENT_FILTER_BY_FILM_GENRE: `CHANGE_CURRENT_FILTER_BY_FILM_GENRE`,
};

export const ActionCreator = {
  changeCurrentFilterByFilmGenre: (genre) => ({
    type: ActionType.CHANGE_CURRENT_FILTER_BY_FILM_GENRE,
    payload: genre,
  }),
};

export const reducer = (appState = initialAppState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ActionType.CHANGE_CURRENT_FILTER_BY_FILM_GENRE:
      return Object.assign({}, appState, {
        currentFilterByFilmGenre: payload,
      });
  }

  return appState;
};
