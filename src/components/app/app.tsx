import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import {compose} from 'recompose';
import {connect} from 'react-redux';

import {Favorites} from '../favorites/favorites';
import MainPage from '../main-page/main-page';
import SignIn from '../sign-in/sign-in';
import FilmDetails from '../film-details/film-details';
import AddReview from '../add-review/add-review';
import {withFilmPlayer} from '../../hocs/with-film-player/with-film-player';
import {withRouteGuard} from '../../hocs/with-route-guard/with-route-guard';
import {getFilmById} from '../../reducer/films/selectors'

const PrivateRoute = withRouteGuard(Route);
const WrappedFilmDetails = compose(
  connect((state, ownProps) => {
    const filmId = parseInt(ownProps.match.params.id);
    return {
      film: getFilmById(state, filmId),
    }
  }),
  withFilmPlayer,
)(FilmDetails);

export const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={withFilmPlayer(MainPage)}/>

      <Route path="/login" component={SignIn}/>

      <Route path="/film/:id" exact component={WrappedFilmDetails} />

      <PrivateRoute path="/favorites" component={Favorites} />

      <PrivateRoute path="/film/:id/reviews/add" component={AddReview} />
    </Switch>
  );
};


