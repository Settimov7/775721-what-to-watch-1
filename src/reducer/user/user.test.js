import MockAdapter from "axios-mock-adapter";

import {createAPI} from "../../api";
import {ActionCreator, ActionType, reducer, Operation} from "./user";

describe(`Action creators work correctly`, () => {
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

  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization()).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
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
      isAuthorizationRequired: true
    });
  });

  it(`Reducer should change id, email, status on login`, () => {
    expect(reducer({
      id: null,
      name: null,
      email: null,
      avatarSrc: null,
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

  it(`Reducer should change isAuthorizationRequired to true`, () => {
    expect(reducer({
      id: 1,
      name: `name`,
      email: `email@mail.com`,
      avatarSrc: `img/avatar.jpg`,
      isAuthorizationRequired: false,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION
    })).toEqual({
      id: null,
      name: null,
      email: null,
      avatarSrc: null,
      isAuthorizationRequired: true,
    });
  });
});

describe(`Operations works correctly`, () => {
  it(`Should make a correct API post call to /login`, () => {
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

  it(`Should make a correct API get call from /login`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const login = Operation.checkAuthorization();

    apiMock
      .onGet(`/login`)
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

