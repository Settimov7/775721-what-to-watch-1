import {HTTP_STATUS} from "../../api";

const initialState = {
  id: null,
  name: null,
  email: null,
  avatarSrc: null,
  isAuthorizationRequired: null,
};


export const ActionType = {
  LOGIN: `LOGIN`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};

export const ActionCreator = {
  login: (userData) => {
    return {
      type: ActionType.LOGIN,
      payload: userData,
    };
  },

  requireAuthorization: () => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
    };
  },
};

export const Operation = {
  login: (email, password) => (dispatch, _getState, api) =>
    api
      .post(`/login`, {
        email,
        password,
      })
      .then((response) => {
        dispatch(ActionCreator.login(response.data));
      }),

  checkAuthorization: () => (dispatch, _getState, api) =>
    api
      .get(`/login`)
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          dispatch(ActionCreator.login(response.data));
        }
      }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return Object.assign({}, state, {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        avatarSrc: action.payload[`avatar_url`],
        isAuthorizationRequired: false,
      });

    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        id: null,
        name: null,
        email: null,
        avatarSrc: null,
        isAuthorizationRequired: true,
      });
  }

  return state;
};
