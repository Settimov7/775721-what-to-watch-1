const initialState = {
  reviews: [],
};

export const ActionType = {
  POST_REVIEW: `POST_REVIEW`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
};

export const ActionCreator = {
  postReview: (reviews) => {
    return {
      type: ActionType.POST_REVIEW,
      payload: reviews,
    };
  },

  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },
};

export const Operation = {
  postReview: (filmId, rating, comment) => (dispatch, _getState, api) =>
    api
    .post(`/comments/${filmId}`, {
      rating,
      comment,
    })
    .then((response) => {
      dispatch(ActionCreator.postReview(response.data));
    }),

  loadReviews: (filmId) => (dispatch, _getState, api) =>
    api
      .get(`/comments/${filmId}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(response.data));
      }),
};

export const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ActionType.POST_REVIEW:
      return Object.assign({}, state, {
        reviews: [...payload],
      });

    case ActionType.LOAD_REVIEWS:
      return Object.assign({}, state, {
        reviews: [...payload],
      });
  }

  return state;
};
