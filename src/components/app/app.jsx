import * as React from 'react';
import * as PropTypes from 'prop-types';

import {MainPage} from "../main-page/main-page";

export const App = ({films}) => {
  return (
    <MainPage films={films}/>
  );
};

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    posterSrc: PropTypes.string,
  })).isRequired,
};

