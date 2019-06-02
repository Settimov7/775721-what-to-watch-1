import * as React from 'react';
import {shallow} from 'enzyme';

import {SignIn} from "./sign-in";

it(`On input name change correctly change state`, () => {
  const login = jest.fn();
  const closeSignInPage = jest.fn();
  const props = {
    login,
    closeSignInPage,
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
  });
});

it(`On input password change correctly change state`, () => {
  const login = jest.fn();
  const closeSignInPage = jest.fn();
  const props = {
    login,
    closeSignInPage,
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
  });
});

it(`On submit correctly trigger submit handle`, () => {
  const login = jest.fn();
  const closeSignInPage = jest.fn();
  const formSendPrevention = jest.fn();
  const props = {
    login,
    closeSignInPage,
  };
  const signIn = shallow(<SignIn {...props} />);
  const form = signIn.find(`form`);

  signIn.setState({
    email: `email@mail.com`,
    password: `password`,
  });

  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(formSendPrevention).toHaveBeenCalledTimes(1);
  expect(login).toHaveBeenCalledTimes(1);
  expect(login).toHaveBeenCalledWith(`email@mail.com`, `password`);
  expect(closeSignInPage).toHaveBeenCalledTimes(1);
});