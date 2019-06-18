const initialState = {
  reviews: [],
};


export const ActionType = {
  POST_REVIEW: `POST_REVIEW`,
};

export const ActionCreator = {
  postReview: (reviews) => {
    return {
      type: ActionType.POST_REVIEW,
      payload: reviews,
    };
  },
};

export const Operation = {
  postReview: (filmId, rating, comment) => (dispatch, _getState, api) => {
    return api.post(`/comments/${filmId}`, {
      rating,
      comment,
    })
      .then((response) => {
        dispatch(ActionCreator.postReview(response.data));
      });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.POST_REVIEW:
      return Object.assign({}, state, {
        reviews: action.payload,
      });
  }

  return state;
};
