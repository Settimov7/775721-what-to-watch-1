const initialState = {
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

export const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ActionType.CHANGE_CURRENT_FILTER_BY_FILM_GENRE:
      return Object.assign({}, state, {
        currentFilterByFilmGenre: payload,
      });
  }

  return state;
};
