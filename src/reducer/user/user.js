const initialState = {
  id: null,
  name: null,
  email: null,
  avatarSrc: null,
  isSignInPage: false,
  isAuthorizationRequired: true,
};


export const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOGIN: `LOGIN`,
  OPEN_SIGN_IN_PAGE: `OPEN_SIGN_IN_PAGE`,
  CLOSE_SIGN_IN_PAGE: `CLOSE_SIGN_IN_PAGE`,
};

export const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  login: (userData) => {
    return {
      type: ActionType.LOGIN,
      payload: userData,
    };
  },

  openSignInPage: () => {
    return {
      type: ActionType.OPEN_SIGN_IN_PAGE,
    };
  },

  closeSignInPage: () => {
    return {
      type: ActionType.CLOSE_SIGN_IN_PAGE,
    };
  },
};

export const Operation = {
  login: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, {
      email,
      password,
    })
      .then((response) => {
        dispatch(ActionCreator.login(response.data));
      });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });

    case ActionType.LOGIN:
      return Object.assign({}, state, {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        avatarSrc: action.payload[`avatar_url`],
        isAuthorizationRequired: false,
      });

    case ActionType.OPEN_SIGN_IN_PAGE:
      return Object.assign({}, state, {
        isSignInPage: true,
      });

    case ActionType.CLOSE_SIGN_IN_PAGE:
      return Object.assign({}, state, {
        isSignInPage: false,
      });
  }

  return state;
};
