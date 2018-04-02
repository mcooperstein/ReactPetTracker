/*
import React, { Component } from 'react';

export default class Signin extends Component {
  render() {
    return (
      <div>Sign In Page</div>
    );
  }
}
*/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './Signup';
import { auth } from '../firebase';

import { PasswordForgetLink } from './PasswordForget';

const SignInPage = ({ history }) =>
  <div className="form-group">
    <h1 id="sign-in-header">Sign In</h1>
    <SignInForm history={history} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push("/");
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group" id="sign-in-form">
        <label className="control-label">Email Address</label>
        <input
          className="form-control"
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <label className="control-label">Password</label>
        <input
          className="form-control"
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <button id="sign-in-button" disabled={isInvalid} type="submit" className="btn btn-primary btn-block">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
        <div id="sign-in-footer">
          <PasswordForgetLink />
          <SignUpLink />
        </div>
        </div>
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
