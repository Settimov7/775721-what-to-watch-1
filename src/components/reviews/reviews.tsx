import * as React from 'react';
import * as moment from 'moment';

import {Review} from '../../types';

interface Props {
  reviews: Review[],
}

export const Reviews: React.FunctionComponent<Props> = (props) => {
  const {reviews} = props;
  const oddReviews = reviews.filter((review, index) => index % 2 === 0);
  const evenReviews = reviews.filter((review, index) => index % 2);
  const getReviewsElements = (reviews) => reviews.map((review) => {
    const {id, comment, user, date, rating} = review;
    const momentDate = moment(date);

    return (
      <div className="review" key={id}>
        <blockquote className="review__quote">
          <p className="review__text">{comment}</p>

          <footer className="review__details">
            <cite className="review__author">{user.name}</cite>
            <time className="review__date" dateTime={momentDate.format(`YYYY-MM-DD`)}>{momentDate.format(`MMMM DD, YYYY`)}</time>
          </footer>
        </blockquote>

        <div className="review__rating">{rating}</div>
      </div>
    )
  });

  return(
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {getReviewsElements(oddReviews)}
      </div>

      <div className="movie-card__reviews-col">
        {getReviewsElements(evenReviews)}
      </div>
    </div>
  );
};
