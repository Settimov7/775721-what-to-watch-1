import * as React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import UserBlock from '../user-block/user-block';
import {Logo} from '../logo/logo';
import {Rating} from '../rating/rating';

import {
  getCurrentFilmId,
  getCurrentFilmName,
  getCurrentFilmBackgroundImage,
  getCurrentFilmPoster,
  getCurrentFilmBackgroundColor,
} from '../../reducer/films/selectors';
import {Operation} from '../../reducer/reviews/reviews';

import {COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH, MAX_RATING} from './constants';

import {history} from '../../history';

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
  isFormBlocked: boolean,
}

export class AddReview extends React.PureComponent <Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rating: null,
      comment: ``,
      isFormBlocked: false,
    };

    this._handleRatingChange = this._handleRatingChange.bind(this);
    this._handleCommentInput = this._handleCommentInput.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    const {
      filmId,
      filmName,
      backgroundImage,
      poster,
      backgroundColor,
    } = this.props;
    const {rating, comment} = this.state;
    const isButtonActive = rating && comment;

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
          <form action="#" className="add-review__form" onSubmit={this._handleSubmit}>
            <Rating max={MAX_RATING} onChange={this._handleRatingChange}/>

            <div className="add-review__text">
              <textarea
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Review text"
                minLength={COMMENT_MIN_LENGTH}
                maxLength={COMMENT_MAX_LENGTH}
                onInput={this._handleCommentInput}
              />
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled={!isButtonActive}>Post</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }

  _handleRatingChange(value) {
    this.setState({
      rating: value,
    })
  }

  _handleCommentInput(evt) {
    const value = evt.target.value;

    this.setState({
      comment: value,
    })
  }

  _handleSubmit(evt) {
    evt.preventDefault();

    const {filmId, postReview} = this.props;
    const {rating, comment} = this.state;

    this.setState({
      isFormBlocked: true,
    });

    postReview(filmId, rating, comment)
      .then(() => {
        history.push(`/film/${filmId}`);
      })
      .catch(() => {
        this.setState({
          isFormBlocked: false,
        });
      });
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
