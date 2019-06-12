import * as React from 'react';
import {Switch, Route} from 'react-router-dom';

import MainPage from "../main-page/main-page";
import SignIn from "../sign-in/sign-in";
import {Favorites} from "../favorites/favorites";
import {withRouteGuard} from "../../hocs/with-route-guard/with-route-guard";
import FilmDetails from "../film-details/film-details";

const PrivateRoute = withRouteGuard(Route);

export const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={MainPage}/>

      <Route path="/login" component={SignIn}/>

      <Route path="/film/:id" component={FilmDetails} />

      <PrivateRoute path={`/favorites`} component={Favorites} />
    </Switch>
  );
};


