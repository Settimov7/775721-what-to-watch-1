import * as React from 'react';
import {connect} from 'react-redux';

import {ActionCreator} from "../../reducer/filter/filter";
import {getFilmsGenres} from "../../reducer/films/selectors";
import {getCurrentFilter} from "../../reducer/filter/selectors";

const GenreToFilterTitle = {
  all: `All genres`,
  Crime: `Crime`,
  Action: `Action`,
  Drama: `Drama`,
  Comedy: `Comedies`,
  Adventure: `Adventure`,
  Fantasy: `Fantasy`,
  Thriller: `Thriller`,
};

interface Props {
  properties: string[],
  currentFilter: string,
  changeCurrentFilter: (g: string) => void,
}

export const FilterList = (props: Props) => {
  const {properties, currentFilter, changeCurrentFilter} = props;
  const filters = [`all`, ...new Set(properties)];

  return (
    <ul className="catalog__genres-list">
      {filters.map((filter) => {
        const isActive = filter === currentFilter;

        return (
          <li
            key={filter}
            className={`catalog__genres-item ${isActive && `catalog__genres-item--active`}`}
          >
            <a
              href="#"
              className="catalog__genres-link"
              onClick={(evt) => {
                evt.preventDefault();

                if (!isActive) {
                  changeCurrentFilter(filter);
                }
              }}
            >
              {GenreToFilterTitle[filter]}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  properties: getFilmsGenres(state),
  currentFilter: getCurrentFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeCurrentFilter: (genre: string): void => {
    dispatch(ActionCreator.changeCurrentFilterByFilmGenre(genre));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterList);

