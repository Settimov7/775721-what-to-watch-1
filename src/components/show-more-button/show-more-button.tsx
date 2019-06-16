import * as React from 'react';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer/films/films';
import {getIsVisibleShowMoreButton} from '../../reducer/films/selectors';

interface Props {
  onClick: () => void;
  isVisible: boolean;
}

export const ShowMoreButton = (props: Props) => {
  const {onClick, isVisible} = props;

  if(!isVisible) {
    return null;
  }

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={(evt) => {
          evt.preventDefault();

          onClick();
        }}
      >
        Show more
      </button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isVisible: getIsVisibleShowMoreButton(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClick: (): void => {
    dispatch(ActionCreator.increaseDisplayedFilmsNumber());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowMoreButton);
