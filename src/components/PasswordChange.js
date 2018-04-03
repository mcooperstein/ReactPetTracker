import React, { Component } from 'react';

import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <div>
      <h1 id="pw-change-header">Change Your Password</h1>
      <form onSubmit={this.onSubmit}>
        <div className="form-group" id="pw-change-form">
          <label className="form-label">New Password</label>
        <input
          className="form-control"
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="New password"
        />
        <label className="form-label">Confirm Password</label>
        <input
          className="form-control"
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm password"
        />
        <button disabled={isInvalid} type="submit" id="pw-change-button" className="btn btn-primary btn-block">
          Update My Password
        </button>

        { error && <p>{error.message}</p> }
      </div>
      </form>
    </div>
    );
  }
}

export default PasswordChangeForm;
