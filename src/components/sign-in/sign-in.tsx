import * as React from 'react';
import {connect} from 'react-redux';

import {Footer} from '../footer/footer';
import {Logo} from '../logo/logo';

import {getIsAuthorizationRequired} from '../../reducer/user/selectors';
import {Operation} from '../../reducer/user/user';

import {history} from '../../history';

interface Props {
  login: typeof Operation.login,
  isAuthorizationRequired: boolean,
}

interface State {
  email: string,
  password: string,
  error: string,
}

export class SignIn extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      password: ``,
      error: ``,
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount(): void {
    const {isAuthorizationRequired} = this.props;

    if(!isAuthorizationRequired) {
      history.push(`/`);
    }
  }

  render() {
    const {email, password} = this.state;
    const {error} = this.state;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo />

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this._handleSubmit}>
            {error && <div className="sign-in__message">
              <p>{error}</p>
            </div>}

            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="email"
                  id="email"
                  value={email}
                  onChange={this._handleInputChange}
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
                  value={password}
                  onChange={this._handleInputChange}
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

  _handleInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const {value, name} = evt.target;

    this.setState((state: State): State => ({
      ...state,
      [name]: value,
    }));
  }

  _handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const {email, password} = this.state;
    const {login} = this.props;
    const error = this._checkForm();

    if(!error) {
      login(email, password).then(() => {
        history.goBack();
      });
    } else {
      this.setState({
        error,
      })
    }
  }

  _checkForm(): string {
    const {email, password} = this.state;

    if(!email && !password) {
      return `Please enter email address and password`;
    }

    if(!email) {
      return`Please enter email address`;
    }

    if(!password) {
      return `Please enter password`;
    }
  }
}

const mapStateToProps = (state) => ({
  isAuthorizationRequired: getIsAuthorizationRequired(state),
});

const mapDispatchToProps = {
  login: Operation.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
