import * as React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {getIsAuthorizationRequired} from '../../reducer/user/selectors';

export const withRouteGuard = (Route) => {
  const WithRouteGuard = (props) => {
    const {isAuthorizationRequired, location} = props;

    if (isAuthorizationRequired) {
      return <Redirect push to={{
        pathname: `/login`,
        state: {
          from: location.pathname
        }
      }}/>;
    }

    return <Route {...props}/>;
  };

  WithRouteGuard.propTypes = {
    isAuthorizationRequired: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  const mapStateToProps = (state) => ({
    isAuthorizationRequired: getIsAuthorizationRequired(state),
  });

  return connect(mapStateToProps)(WithRouteGuard);
};
