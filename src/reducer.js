const initialAppState = {
  currentFilterByFilmGenre: `all`,
  films: [],
};

export const reducer = (appState = initialAppState, action) => {
  const {type, payload} = action;

  switch (type) {
    case `CHANGE_CURRENT_FILTER_BY_FILM_GENRE`:
      return Object.assign({}, appState, {
        currentFilterByFilmGenre: payload,
      });

    case `LOAD_FILMS`:
      return Object.assign({}, appState, {
        films: [...payload],
      });
  }

  return appState;
};

export const actionCreator = {
  changeCurrentFilterByFilmGenre: (genre) => ({
    type: `CHANGE_CURRENT_FILTER_BY_FILM_GENRE`,
    payload: genre,
  }),

  loadFilms: (films) => ({
    type: `LOAD_FILMS`,
    payload: films,
  }),
};

