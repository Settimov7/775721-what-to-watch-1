import * as React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {compose} from 'recompose';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';

import {App} from './components/app/app';

import {reducer} from './reducer/index';
import {Operation} from './reducer/films/films';

import {createAPI} from './api';
import {history} from './history';

declare const __REDUX_DEVTOOLS_EXTENSION__: () => any;

const initApp = () => {
  const onLoginFail = () => {
    history.push(`/login`);
  };
  const api = createAPI(onLoginFail);
  const appStore = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
        __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()
      )
  );

  appStore.dispatch(Operation.loadFilms());
  appStore.dispatch(Operation.loadPromoFilm());

  render((
    <Provider store={appStore}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  ), document.getElementById(`root`));
};

initApp();
