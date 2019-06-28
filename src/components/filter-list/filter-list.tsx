import * as React from 'react';
import {connect} from 'react-redux';

import {ActionCreator as FilterActionCreator} from "../../reducer/filter/filter";
import {ActionCreator as FilmsActionCreator} from '../../reducer/films/films';
import {getFilmsGenres} from "../../reducer/films/selectors";
import {getCurrentFilter} from "../../reducer/filter/selectors";

import {GenreToFilterTitle, MAX_FILTERS} from './constants';

interface Props {
  properties: string[],
  activeItem: string,
  onChange: (genre: string) => void,
}

export const FilterList: React.FunctionComponent<Props> = (props) => {
  const {properties, activeItem, onChange} = props;
  const filters = [`all`, ...new Set(properties)].slice(0, MAX_FILTERS);

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
              {GenreToFilterTitle[filter] || filter}
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

