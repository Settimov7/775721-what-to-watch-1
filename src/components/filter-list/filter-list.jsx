import * as React from 'react';
import * as PropTypes from 'prop-types';
import {connect} from "react-redux";

import {actionCreator} from "../../reducer";

const GenreToFilterTitle = {
  all: `All genres`,
  drama: `Drama`,
  fantastic: `Fantastic`,
  comedy: `Comedies`,
};

export const FilterList = (props) => {
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
  properties: state.films.map((film) => film.genre),
  currentFilter: state.currentFilterByFilmGenre,
});

const mapDispatchToProps = (dispatch) => ({
  changeCurrentFilter: (genre) => {
    dispatch(actionCreator.changeCurrentFilterByFilmGenre(genre));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterList);

FilterList.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentFilter: PropTypes.string.isRequired,
  changeCurrentFilter: PropTypes.func.isRequired,
};

