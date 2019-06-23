import axios from 'axios';

const API_CONFIG = {
  baseURL: `https://es31-server.appspot.com/wtw`,
  timeout: 5000,
  withCredentials: true,
};

export const HTTP_STATUS = {
  OK: 200,
  FORBIDDEN: 403,
};

export const createAPI = (onLoginFail) => {
  const api = axios.create(API_CONFIG);
  const onSuccess = (response) => response;
  const onFail = (error) => {
    if (error.response.status === HTTP_STATUS.FORBIDDEN) {
      onLoginFail();
    }

    return error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
