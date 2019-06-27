import {LEVELS} from './constants';

export const getLevelByRating = (rating: number): string =>
  LEVELS.find(({min, max}) => (rating>= min && rating < max) || rating === min).value;
