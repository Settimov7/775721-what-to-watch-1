import * as React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import MainPage from "../main-page/main-page";
import {getIsSignInPage} from "../../reducer/user/selectors";
import SignIn from "../sign-in/sign-in";

export const App = (props) => {
  const {isSignInPage} = props;

  if (isSignInPage) {
    return <SignIn />;
  }

  return (
    <MainPage />
  );
};

App.propTypes = {
  isSignInPage: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isSignInPage: getIsSignInPage(state),
});

export default connect(mapStateToProps)(App);


