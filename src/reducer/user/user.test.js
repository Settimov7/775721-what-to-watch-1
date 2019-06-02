import MockAdapter from "axios-mock-adapter";

import {createAPI} from "../../api";
import {ActionCreator, ActionType, reducer, Operation} from "./user";

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(false)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: false,
    });
  });

  it(`Action creator for login returns correct action`, () => {
    expect(ActionCreator.login({
      id: 1,
      name: `name`,
      email: `email@mail.com`,
      avatarSrc: `img/avatar.jpg`
    })).toEqual({
      type: ActionType.LOGIN,
      payload: {
        id: 1,
        name: `name`,
        email: `email@mail.com`,
        avatarSrc: `img/avatar.jpg`,
      },
    });
  });

  it(`Action creator for open sign in page returns correct action`, () => {
    expect(ActionCreator.openSignInPage()).toEqual({
      type: ActionType.OPEN_SIGN_IN_PAGE,
    });
  });

  it(`Action creator for close sign in page returns correct action`, () => {
    expect(ActionCreator.closeSignInPage()).toEqual({
      type: ActionType.CLOSE_SIGN_IN_PAGE,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      id: null,
      name: null,
      email: null,
      avatarSrc: null,
      isSignInPage: false,
      isAuthorizationRequired: true
    });
  });

  it(`Reducer should change status by a given value`, () => {
    expect(reducer({
      isAuthorizationRequired: false,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true,
    })).toEqual({
      isAuthorizationRequired: true,
    });

    expect(reducer({
      isAuthorizationRequired: true,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: false,
    })).toEqual({
      isAuthorizationRequired: false,
    });
  });

  it(`Reducer should change id, email, status on login`, () => {
    expect(reducer({
      id: null,
      email: null,
      isAuthorizationRequired: true,
    }, {
      type: ActionType.LOGIN,
      payload: {
        id: 1,
        name: `name`,
        email: `email@mail.com`,
        [`avatar_url`]: `img/avatar.jpg`,
      }
    })).toEqual({
      id: 1,
      name: `name`,
      email: `email@mail.com`,
      avatarSrc: `img/avatar.jpg`,
      isAuthorizationRequired: false,
    });
  });

  it(`Reducer should isSignInPage to true`, () => {
    expect(reducer({
      isSignInPage: false,
    }, {
      type: ActionType.OPEN_SIGN_IN_PAGE,
    })).toEqual({
      isSignInPage: true,
    });
  });

  it(`Reducer should isSignInPage to false`, () => {
    expect(reducer({
      isSignInPage: true,
    }, {
      type: ActionType.CLOSE_SIGN_IN_PAGE,
    })).toEqual({
      isSignInPage: false,
    });
  });
});

describe(`Operations works correctly`, () => {
  it(`Should make a correct API call to /login`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const login = Operation.login(`email`, `password`);

    apiMock
      .onPost(`/login`)
      .reply(200, {fake: true});

    return login(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOGIN,
          payload: {fake: true},
        });
      });
  });
});

