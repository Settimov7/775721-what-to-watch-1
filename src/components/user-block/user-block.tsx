import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getIsAuthorizationRequired, getUserAvatarSrc} from '../../reducer/user/selectors';

interface Props {
  isAuthorizationRequired: boolean;
  userAvatarSrc: string | null;
}

export const UserBlock: React.FunctionComponent<Props> = (props) => {
  const {isAuthorizationRequired, userAvatarSrc} = props;

  return(
    <div className="user-block">
      {isAuthorizationRequired ? (
        <Link to="/login" className="logo__link">Sign in</Link>
      ) : (
        <Link to="/mylist">
          <div className="user-block__avatar">
            <img src={userAvatarSrc} alt="User avatar" width="63" height="63"/>
          </div>
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthorizationRequired: getIsAuthorizationRequired(state),
  userAvatarSrc: getUserAvatarSrc(state),
});

export default connect(mapStateToProps)(UserBlock);
