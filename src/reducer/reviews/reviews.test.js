import MockAdapter from "axios-mock-adapter";

import {createAPI} from "../../api";
import {ActionCreator, ActionType, reducer, Operation} from "./reviews";

describe(`Action creators work correctly`, () => {
  it(`Action creator for post review returns correct action`, () => {
    expect(ActionCreator.postReview([`mock`, `mock`])).toEqual({
      type: ActionType.POST_REVIEW,
      payload: [`mock`, `mock`],
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      reviews: [],
    });
  });

  it(`Reducer should change status by a given value`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.POST_REVIEW,
      payload: [`mock`, `mock`],
    })).toEqual({
      reviews: [`mock`, `mock`],
    });
  });
});

describe(`Operations works correctly`, () => {
  it(`Should make a correct API call to /comments/:filmId`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmId = 1;
    const rating = 5;
    const comment = `comment`;
    const postReview = Operation.postReview(filmId, rating, comment);

    apiMock
      .onPost(`/comments/${filmId}`)
      .reply(200, [`mock`, `mock`]);

    return postReview(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.POST_REVIEW,
          payload: [`mock`, `mock`],
        });
      });
  });
});

