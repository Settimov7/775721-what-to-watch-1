import * as React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import UserBlock from '../user-block/user-block';
import {Logo} from '../logo/logo';

import {
  getCurrentFilmId,
  getCurrentFilmName,
  getCurrentFilmBackgroundImage,
  getCurrentFilmPoster,
  getCurrentFilmBackgroundColor,
} from '../../reducer/films/selectors';
import {Operation} from '../../reducer/reviews/reviews';
import {Rating} from '../rating/rating';

interface Props {
  filmId: number,
  filmName: string,
  backgroundImage: string,
  poster: string,
  backgroundColor: string,
  postReview: typeof Operation.postReview,
}

interface State {
  rating: number,
  comment: string,
}

const COMMENT_MIN_LENGTH = 50;
const COMMENT_MAX_LENGTH = 400;
const MAX_RATING = 5;

export class AddReview extends React.PureComponent <Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rating: 3,
      comment: ``,
    };

    this._ratingChangeHandler = this._ratingChangeHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
  }

  render() {
    const {
      filmId,
      filmName,
      backgroundImage,
      poster,
      backgroundColor,
    } = this.props;

    return (
      <section className="movie-card movie-card--full" style={{backgroundColor}}>
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={filmName}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <Logo />

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/film/${filmId}`} className="breadcrumbs__link">{filmName}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <UserBlock />
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={poster} alt={filmName} width="218"
                 height="327"/>
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form" onSubmit={this._submitHandler}>
            <Rating max={MAX_RATING} onChange={this._ratingChangeHandler}/>

            <div className="add-review__text">
              <textarea
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Review text"
                minLength={COMMENT_MIN_LENGTH}
                maxLength={COMMENT_MAX_LENGTH}
                onInput={this._commentInputHandler}
              />
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit">Post</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }

  _ratingChangeHandler(value) {
    this.setState({
      rating: value,
    })
  }

  _commentInputHandler(evt) {
    const value = evt.target.value;

    this.setState({
      comment: value,
    })
  }

  _submitHandler(evt) {
    evt.preventDefault();

    const {filmId, postReview} = this.props;
    const {rating, comment} = this.state;

    postReview(filmId, rating, comment);
  }
}

const mapStateToProps = (state, ownProps) => ({
  filmId: getCurrentFilmId(state, ownProps),
  filmName: getCurrentFilmName(state, ownProps),
  backgroundImage: getCurrentFilmBackgroundImage(state, ownProps),
  poster: getCurrentFilmPoster(state, ownProps),
  backgroundColor: getCurrentFilmBackgroundColor(state, ownProps),
});

const mapDispatchToProps = {
  postReview: Operation.postReview,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
