import {combineReducers} from "redux";

import {reducer as films} from "./films/films";
import {reducer as filter} from "./filter/filter";
import {reducer as user} from "./user/user";
import {reducer as reviews} from "./reviews/reviews";
import {NameSpace} from "./name-spaces";

export const reducer = combineReducers({
  [NameSpace.FILMS]: films,
  [NameSpace.FILTER]: filter,
  [NameSpace.USER]: user,
  [NameSpace.REVIEWS]: reviews,
});
