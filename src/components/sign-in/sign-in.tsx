import * as React from 'react';
import {connect} from 'react-redux';

import {Footer} from '../footer/footer';

import {Operation} from '../../reducer/user/user';

import {history} from '../../history';
import {Logo} from '../logo/logo';

interface Props {
  login: typeof Operation.login,
}

interface State {
  email: string,
  password: string,
}

export class SignIn extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      password: ``,
    };

    this._inputChangeHandle = this._inputChangeHandle.bind(this);
    this._submitHandle = this._submitHandle.bind(this);
  }

  render() {
    const {email, password} = this.state;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo />

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this._submitHandle}>
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="email"
                  id="email"
                  required
                  value={email}
                  onChange={this._inputChangeHandle}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  required
                  value={password}
                  onChange={this._inputChangeHandle}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    );
  }

  _inputChangeHandle(evt: React.ChangeEvent<HTMLInputElement>) {
    const {value, name} = evt.target;

    this.setState((state: State): State => ({
      ...state,
      [name]: value,
    }));
  }

  _submitHandle(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const {email, password} = this.state;
    const {login} = this.props;

    login(email, password).then(() => {
      history.goBack();
    });
  }
}

const mapDispatchToProps = {
  login: Operation.login,
};

export default connect(null, mapDispatchToProps)(SignIn);
