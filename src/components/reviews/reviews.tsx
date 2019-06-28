import * as React from 'react';

import {Review} from '../review/review';

import {Review as ReviewType} from '../../types';

interface Props {
  reviews: ReviewType[],
}

export const Reviews: React.FunctionComponent<Props> = (props) => {
  const {reviews} = props;
  const oddReviews = reviews.filter((review, index) => index % 2 === 0);
  const evenReviews = reviews.filter((review, index) => index % 2);
  const getReviewsElements = (reviews) => reviews.map((review) => {
    const {id, comment, user, date, rating} = review;

    return (
      <Review
        key={id}
        comment={comment}
        user={user}
        date={date}
        rating={rating}
      />
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
