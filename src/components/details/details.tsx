import * as React from 'react';

export const Details = (props) => {
  const {director, starring, runTime, genre, releasedYear} = props;

  return(
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>

          {starring.map((actor, index) => {
            const isLastActor = index === starring.length -1;

            if(isLastActor) {
              return <span key={actor} className="movie-card__details-value">{actor}</span>;
            }

            return (
              <span key={actor} className="movie-card__details-value">
                {`${actor},`}<br />
              </span>
            )
          })}
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{runTime}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{releasedYear}</span>
        </p>
      </div>
    </div>
  );
};
