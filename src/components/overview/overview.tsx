import * as React from 'react';

interface Props {
  rating: number,
  director: string,
  description: string,
  starring: string[],
}

export const Overview: React.FunctionComponent<Props> = (props) => {
  const {rating, director, description, starring} = props;

  return(
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">Very good</span>
          <span className="movie-rating__count">240 ratings</span>
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
