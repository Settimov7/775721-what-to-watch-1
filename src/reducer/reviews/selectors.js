import {NameSpace} from "../name-spaces";

const NAME_SPACE = NameSpace.REVIEWS;

export const getReviews = (state) => {
  return state[NAME_SPACE].reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
};
