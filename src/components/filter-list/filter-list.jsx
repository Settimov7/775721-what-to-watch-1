import * as React from 'react';
import * as PropTypes from 'prop-types';

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

FilterList.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentFilter: PropTypes.string.isRequired,
  changeCurrentFilter: PropTypes.func.isRequired,
};

