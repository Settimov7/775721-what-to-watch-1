import * as React from 'react';
import {render} from 'react-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";

import {reducer} from "./reducer";
import {actionCreator} from "./reducer";
import {App} from './components/app/app';
import {films} from './mocks/films';


const initApp = () => {
  const appStore = createStore(
      reducer,
      window[`__REDUX_DEVTOOLS_EXTENSION__`] && window[`__REDUX_DEVTOOLS_EXTENSION__`]()
  );

  appStore.dispatch(actionCreator.loadFilms(films));

  render((
    <Provider store={appStore}>
      <App />
    </Provider>
  ), document.getElementById(`root`));
};

initApp();
