import * as React from 'react';
import {connect} from 'react-redux';

import {ActionCreator as FilterActionCreator} from "../../reducer/filter/filter";
import {ActionCreator as FilmsActionCreator} from '../../reducer/films/films';
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
  activeItem: string,
  onChange: (genre: string) => void,
}

export const FilterList = (props: Props) => {
  const {properties, activeItem, onChange} = props;
  const filters = [`all`, ...new Set(properties)];

  return (
    <ul className="catalog__genres-list">
      {filters.map((filter) => {
        const isActive = filter === activeItem;

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
                  onChange(filter);
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
  activeItem: getCurrentFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (genre: string): void => {
    dispatch(FilterActionCreator.changeCurrentFilterByFilmGenre(genre));
    dispatch(FilmsActionCreator.resetDisplayedFilmsNumber());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterList);

