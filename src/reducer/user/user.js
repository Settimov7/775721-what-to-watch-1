const initialState = {
  id: null,
  name: null,
  email: null,
  avatarSrc: null,
  isAuthorizationRequired: true,
};


export const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOGIN: `LOGIN`,
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
  }

  return state;
};
