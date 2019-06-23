export const transformFilm = (rawFilm) => {
  const {id, name, description, rating, director, genre, released, starring} = rawFilm;

  return {
    id,
    name,
    posterImageSrc: rawFilm[`poster_image`],
    previewImageSrc: rawFilm[`preview_image`],
    backgroundImageSrc: rawFilm[`background_image`],
    backgroundColor: rawFilm[`background_color`],
    description,
    rating,
    scores: rawFilm[`scores_count`],
    director,
    starring,
    runTime: rawFilm[`run_time`],
    genre,
    releasedYear: released,
    isFavorite: rawFilm[`is_favorite`],
    videoSrc: rawFilm[`video_link`],
    previewVideoSrc: rawFilm[`preview_video_link`],
  };
};
