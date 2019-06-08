import * as React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {getIsAuthorizationRequired} from '../../reducer/user/selectors';

export const withRouteGuard = (Route) => {
  type Props = React.ComponentProps<typeof Route>;

  const WithRouteGuard = (props: Props) => {
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

  const mapStateToProps = (state) => ({
    isAuthorizationRequired: getIsAuthorizationRequired(state),
  });

  return connect(mapStateToProps)(WithRouteGuard);
};
