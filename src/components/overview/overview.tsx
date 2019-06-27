import * as React from 'react';

import {getLevelByRating} from './utils';

interface Props {
  rating: number,
  director: string,
  description: string,
  starring: string[],
  scores: number,
}

export const Overview: React.FunctionComponent<Props> = (props) => {
  const {rating, director, description, starring, scores} = props;
  const formattedRating = rating.toFixed(1);
  const level = getLevelByRating(rating);

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{formattedRating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{level}</span>
          <span className="movie-rating__count">{scores} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>

        <p className="movie-card__director">
          <strong>Director: {director}</strong>
        </p>

        <p className="movie-card__starring">
          <strong>
            Starring: {starring.reduce((result, actor, index) => {
            const isLast = index === starring.length - 1;

            return isLast ? `${result} ${actor}` : `${result} ${actor}, `;
          }, ``)} and other
          </strong>
        </p>
      </div>
    </React.Fragment>
  );
};
