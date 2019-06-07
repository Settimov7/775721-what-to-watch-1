import * as React from 'react';
import {Switch, Route} from 'react-router-dom';

import MainPage from "../main-page/main-page";
import SignIn from "../sign-in/sign-in";
import {Favorites} from "../favorites/favorites";
import {withRouteGuard} from "../../hocs/with-route-guard/with-route-guard";

const PrivateRoute = withRouteGuard(Route);

export const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={MainPage}/>

      <Route path="/login" component={SignIn}/>

      <PrivateRoute path={`/favorites`} component={Favorites} />
    </Switch>
  );
};


