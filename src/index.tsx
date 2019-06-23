import * as React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {compose} from 'recompose';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';

import {App} from './components/app/app';

import {reducer} from './reducer/index';
import {Operation as FilmsOperation} from './reducer/films/films';
import {ActionCreator, Operation as UserOperation} from './reducer/user/user';

import {createAPI} from './api';
import {history} from './history';

declare const __REDUX_DEVTOOLS_EXTENSION__: () => any;

const initApp = () => {
  const onLoginFail = () => {
    appStore.dispatch(ActionCreator.requireAuthorization());
  };
  const api = createAPI(onLoginFail);
  const appStore = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
        __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()
      )
  );

  appStore.dispatch(FilmsOperation.loadFilms());
  appStore.dispatch(FilmsOperation.loadPromoFilm());
  appStore.dispatch(UserOperation.checkAuthorization());

  render((
    <Provider store={appStore}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  ), document.getElementById(`root`));
};

initApp();
