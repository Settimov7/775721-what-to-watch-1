export type VideoOptions = {
  width: number,
  height: number,
  isMuted?: boolean,
  isLoop?: boolean,
}

export type FilmCardSize = {
  width: number,
  height: number,
}

export type Film = {
    id: number,
    name: string,
    posterImageSrc: string,
    previewImageSrc: string,
    backgroundImageSrc: string,
    backgroundColor: string,
    description: string,
    rating: number,
    scores: number,
    director: string,
    starring: string[],
    runTime: number,
    genre: string,
    releasedYear: number,
    isFavorite: boolean,
    videoSrc: string,
    previewVideoSrc: string,
}
