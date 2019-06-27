import * as React from 'react';
import {shallow} from 'enzyme';

import {SignIn} from './sign-in';

it(`On input name change correctly change state`, () => {
  const login = jest.fn();
  const props = {
    login,
    isAuthorizationRequired: false,
  };
  const signIn = shallow(<SignIn {...props} />);
  const nameInput = signIn.find(`input[name="email"]`);

  nameInput.simulate(`change`, {
    target: {
      name: `email`,
      value: `email@mail.com`,
    }
  });

  signIn.update();

  expect(signIn.state()).toEqual({
    email: `email@mail.com`,
    password: ``,
    error: ``,
  });
});

it(`On input password change correctly change state`, () => {
  const login = jest.fn();
  const props = {
    login,
    isAuthorizationRequired: false,
  };
  const signIn = shallow(<SignIn {...props} />);
  const nameInput = signIn.find(`input[name="password"]`);

  nameInput.simulate(`change`, {
    target: {
      name: `password`,
      value: `password`,
    }
  });

  signIn.update();

  expect(signIn.state()).toEqual({
    email: ``,
    password: `password`,
    error: ``,
  });
});

it(`On invalid password and email change error`, () => {
  const login = jest.fn();
  const props = {
    login,
    isAuthorizationRequired: false,
  };
  const signIn = shallow(<SignIn {...props} />);

  signIn.instance()._handleSubmit({preventDefault(){}});

  expect(signIn.state()).toEqual({
    email: ``,
    password: ``,
    error: `Please enter email address and password`,
  });
});

it(`On invalid password change error`, () => {
  const login = jest.fn();
  const props = {
    login,
    isAuthorizationRequired: false,
  };
  const signIn = shallow(<SignIn {...props} />);

  signIn.setState({
    email: `mail@mail.com`,
  });

  signIn.instance()._handleSubmit({preventDefault(){}});

  expect(signIn.state()).toEqual({
    email: `mail@mail.com`,
    password: ``,
    error: `Please enter password`,
  });
});

it(`On invalid password change error`, () => {
  const login = jest.fn();
  const props = {
    login,
    isAuthorizationRequired: false,
  };
  const signIn = shallow(<SignIn {...props} />);

  signIn.setState({
    password: `qwerty`,
  });

  signIn.instance()._handleSubmit({preventDefault(){}});

  expect(signIn.state()).toEqual({
    email: ``,
    password: `qwerty`,
    error: `Please enter email address`,
  });
});
