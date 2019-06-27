import * as React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {SvgSprite} from '../svg-sprite/svg-sprite';
import {Logo} from '../logo/logo';
import UserBlock from '../user-block/user-block';
import {Overview} from '../overview/overview';
import {Details} from '../details/details';
import {Reviews} from '../reviews/reviews';
import {Tabs} from '../tabs/tabs';

import {withActiveItem} from '../../hocs/with-active-item/with-active-item';

import {Operation as filmsOperation} from '../../reducer/films/films';
import {Operation as reviewsOperation} from '../../reducer/reviews/reviews';
import {getIsAuthorizationRequired} from '../../reducer/user/selectors';
import {getReviews} from '../../reducer/reviews/selectors';

import {history} from '../../history';

import {Film, Review} from '../../types';

interface Props {
  film: Film;
  reviews: Review[];
  onPlayButtonClick: () => void;
  isAuthorizationRequired: boolean;
  changeFilmFavoriteStatus: (id: number, isFavorite: boolean) => void;
  loadReviews: (id: number) => void;
}

const WrappedTabs = withActiveItem(Tabs, 0);

export class FullFilmCard extends React.PureComponent<Props> {
  componentDidUpdate(): void {
    const {film, loadReviews} = this.props;

    loadReviews(film.id);
  }

  render() {
    const {film, onPlayButtonClick, isAuthorizationRequired, changeFilmFavoriteStatus, reviews} = this.props;
    const {
      id,
      name,
      genre,
      releasedYear,
      backgroundImageSrc,
      posterImageSrc,
      backgroundColor,
      rating,
      director,
      description,
      starring,
      runTime,
      isFavorite,
    } = film;
    const TABS = [
      {
        title: `Overview`,
        component: <Overview
          rating={rating}
          director={director}
          description={description}
          starring={starring}
        />,
      },
      {
        title: `Details`,
        component: <Details
          director={director}
          starring={starring}
          runTime={runTime}
          genre={genre}
          releasedYear={releasedYear}
        />,
      },
      {
        title: `Reviews`,
        component: <Reviews reviews={reviews}/>,
      },
    ];

    return (
      <React.Fragment>
        <SvgSprite />

        <section className="movie-card movie-card--full" style={{backgroundColor: backgroundColor}}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={backgroundImageSrc} alt={name}/>
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <Logo />

              <UserBlock />
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{releasedYear}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button" onClick={(evt) => {
                    evt.preventDefault();

                    onPlayButtonClick();
                  }}>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"/>
                    </svg>
                    <span>Play</span>
                  </button>

                  <button
                    className="btn btn--list movie-card__button"
                    type="button"
                    onClick={(evt) => {
                      evt.preventDefault();

                      if(isAuthorizationRequired) {
                        history.push('/login');
                      } else {
                        changeFilmFavoriteStatus(id, isFavorite);
                      }
                    }}
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref={isFavorite ? `#in-list` : `#add`}/>
                    </svg>
                    <span>My list</span>
                  </button>

                  {!isAuthorizationRequired && <Link to={`/film/${id}/reviews/add`} className="btn movie-card__button">Add review</Link>}
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={posterImageSrc} alt={name} width="218"
                     height="327"/>
              </div>

              <div className="movie-card__desc">
                <WrappedTabs tabs={TABS} />
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthorizationRequired: getIsAuthorizationRequired(state),
  reviews: getReviews(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeFilmFavoriteStatus: (filmId, isFavorite): void =>
    dispatch(filmsOperation.changeFilmFavoriteStatus(filmId, !isFavorite)),

  loadReviews: (filmId): void =>
    dispatch(reviewsOperation.loadReviews(filmId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FullFilmCard);
