import * as React from 'react';

import {MainPage} from "../main-page/main-page";

const filmNames = [`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

export const App = () => {
  return (
    <MainPage filmNames={filmNames}/>
  );
};
