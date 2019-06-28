export type Size = {
  width: number;
  height: number;
};

export type Film = {
  id: number;
  name: string;
  posterImageSrc: string;
  previewImageSrc: string;
  backgroundImageSrc: string;
  backgroundColor: string;
  description: string;
  rating: number;
  scores: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  releasedYear: number;
  isFavorite: boolean;
  videoSrc: string;
  previewVideoSrc: string;
};

export type User = {
  id: number;
  name: string;
}

export type Review = {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string;
};
