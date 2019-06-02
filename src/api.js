import axios from 'axios';

import {ActionCreator} from "./reducer/user/user";

const API_CONFIG = {
  baseURL: `https://es31-server.appspot.com/wtw`,
  timeout: 5000,
  withCredentials: true,
};

const HTTP_STATUS = {
  FORBIDDEN: 403,
};

export const createAPI = (dispatch) => {
  const api = axios.create(API_CONFIG);
  const onSuccess = (response) => response;
  const onFail = (error) => {
    if (error.response.status === HTTP_STATUS.FORBIDDEN) {
      dispatch(ActionCreator.requireAuthorization(true));
    }

    return error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
