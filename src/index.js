import * as React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {compose} from "recompose";
import thunk from "redux-thunk";

import {createAPI} from "./api";
import {reducer} from "./reducer";
import {Operation} from "./reducer/films/films";
import App from './components/app/app';

const initApp = () => {
  const api = createAPI((...args) => appStore.dispatch(...args));
  const appStore = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window[`__REDUX_DEVTOOLS_EXTENSION__`] && window[`__REDUX_DEVTOOLS_EXTENSION__`]()
      )
  );

  appStore.dispatch(Operation.loadFilms());

  render((
    <Provider store={appStore}>
      <App />
    </Provider>
  ), document.getElementById(`root`));
};

initApp();
