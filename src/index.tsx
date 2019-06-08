import * as React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {compose} from "recompose";
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";

import {createAPI} from "./api";
import {reducer} from "./reducer";
import {Operation} from "./reducer/films/films";
import {App} from './components/app/app';

const initApp = () => {
  const onLoginFail = () => history.pushState(null, null, `/login`);
  const api = createAPI(onLoginFail);
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
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById(`root`));
};

initApp();
