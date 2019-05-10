import * as React from 'react';
import * as PropTypes from 'prop-types';

export const FilmCard = (props) => {
  const {film, onPlayClick, onClick, onMouseEnter} = props;
  const {id, title, posterSrc} = film;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={(evt) => {
        evt.preventDefault();

        onMouseEnter(id);
      }}
    >
      <button
        className="small-movie-card__play-btn"
        type="button"
        onClick={onPlayClick}
      >
        Play
      </button>

      <div className="small-movie-card__image">
        <img
          src={posterSrc}
          alt={title}
          width="280"
          height="175"
        />
      </div>

      <h3 className="small-movie-card__title">
        <a
          className="small-movie-card__link"
          href="movie-page.html"
          onClick={onClick}
        >
          {title}
        </a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    posterSrc: PropTypes.string.isRequired,
  }),
  onPlayClick: PropTypes.func,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
};
