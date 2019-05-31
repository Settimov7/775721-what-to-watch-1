import {reducer, ActionCreator, ActionType} from "./filter";

describe(`Action creators work correctly`, () => {
  it(`Filter change correct`, () => {
    expect(ActionCreator.changeCurrentFilterByFilmGenre(`comedy`)).toEqual({
      type: ActionType.CHANGE_CURRENT_FILTER_BY_FILM_GENRE,
      payload: `comedy`,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      currentFilterByFilmGenre: `all`,
    });
  });

  it(`Reducer should change filter by a given value`, () => {
    expect(reducer({
      currentFilterByFilmGenre: `all`,
    }, {
      type: ActionType.CHANGE_CURRENT_FILTER_BY_FILM_GENRE,
      payload: `drama`,
    })).toEqual({
      currentFilterByFilmGenre: `drama`,
    });
  });
});
