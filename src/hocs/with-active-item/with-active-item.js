import * as React from 'react';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {ActionCreator} from "../../reducer/filter/filter";
import {getFilmsGenres} from "../../reducer/films/selectors";
import {getCurrentFilter} from "../../reducer/filter/selectors";

export const withActiveItem = (Component, defaultActiveItem) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: this.props.currentFilter || defaultActiveItem,
      };

      this._setActiveItem = this._setActiveItem.bind(this);
    }

    render() {
      const {activeItem} = this.state;

      return <Component
        {...this.props}
        currentFilter={activeItem}
        changeCurrentFilter={this._setActiveItem}
      />;
    }

    _setActiveItem(item) {
      this.props.changeCurrentFilter(item);
      this.setState({
        activeItem: item,
      });
    }
  }

  WithActiveItem.propTypes = {
    currentFilter: PropTypes.string,
    changeCurrentFilter: PropTypes.func,
  };

  return WithActiveItem;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  properties: getFilmsGenres(state),
  currentFilter: getCurrentFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeCurrentFilter: (genre) => {
    dispatch(ActionCreator.changeCurrentFilterByFilmGenre(genre));
  },
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withActiveItem
);

