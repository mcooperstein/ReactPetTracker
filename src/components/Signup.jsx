/*
import React, { Component } from 'react';

export default class Signup extends Component {
  render() {
    return (
      <div>Sign up Page</div>
    );
  }
}
*/
import React, { Component } from 'react';
import { auth,db } from '../firebase';
import {
  Link,
  withRouter,
} from 'react-router-dom';


const SignUpPage = ({history}) =>
  <div>
    <h1 id="sign-up-header">Sign Up Today!</h1>
    <SignUpForm history={history} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;
    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push("/");
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });

      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group" id="sign-up-form">
          <label className="control-label">Name</label>
        <input
          className="form-control"
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <label className="control-label">Email</label>
        <input
          className="form-control"
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <label className="control-label">Create Password</label>
        <input
          className="form-control"
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <label className="control-label">Confirm Password</label>
        <input
          className="form-control"
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <button id="sign-up-button" disabled={isInvalid} type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </div>
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to="/sign-up">Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
