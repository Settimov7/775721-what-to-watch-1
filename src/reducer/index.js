import {combineReducers} from "redux";

import {reducer as films} from "./films/films";
import {reducer as filter} from "./filter/filter";
import {NameSpace} from "./name-spaces";

export const reducer = combineReducers({
  [NameSpace.FILMS]: films,
  [NameSpace.FILTER]: filter,
});
