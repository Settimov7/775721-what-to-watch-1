import MockAdapter from "axios-mock-adapter";

import {createAPI} from "../../api";
import {ActionCreator, ActionType, reducer, Operation} from "./reviews";

describe(`Action creators work correctly`, () => {
  it(`Action creator for post review returns correct action`, () => {
    expect(ActionCreator.postReview([`review`, `review`])).toEqual({
      type: ActionType.POST_REVIEW,
      payload: [`review`, `review`],
    });
  });

  it(`Action creator for load review returns correct action`, () => {
    expect(ActionCreator.loadReviews([`review`, `review`])).toEqual({
      type: ActionType.LOAD_REVIEWS,
      payload: [`review`, `review`],
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      reviews: [],
    });
  });

  it(`On POST_REVIEW action reducer should change reviews by a given value`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.POST_REVIEW,
      payload: [`review`, `review`],
    })).toEqual({
      reviews: [`review`, `review`],
    });
  });

  it(`On LOAD_REVIEW action reducer should change reviews by a given value`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: [`review`, `review`],
    })).toEqual({
      reviews: [`review`, `review`],
    });
  });
});

describe(`Operations works correctly`, () => {
  it(`Should make a correct API post call to /comments/:filmId`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmId = 1;
    const rating = 5;
    const comment = `comment`;
    const postReview = Operation.postReview(filmId, rating, comment);

    apiMock
      .onPost(`/comments/${filmId}`)
      .reply(200, [`review`, `review`]);

    return postReview(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.POST_REVIEW,
          payload: [`review`, `review`],
        });
      });
  });

  it(`Should make a correct API get call to /comments/:filmId`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmId = 1;
    const postReview = Operation.loadReviews(filmId);

    apiMock
      .onGet(`/comments/${filmId}`)
      .reply(200, [`review`, `review`]);

    return postReview(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: [`review`, `review`],
        });
      });
  });
});

