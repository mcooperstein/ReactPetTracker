/*
import React, { Component } from 'react';

export default class Account extends Component {
  render() {
    return (
      <div>Your Account</div>
    );
  }
}

*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import { firebase } from '../firebase';
/*
const AccountPage = (props, { authUser }) =>
<div>
  { authUser ?
      <div>
          <h1>Account: {authUser.email}</h1>
          <PasswordForgetForm />
          <PasswordChangeForm />
      </div>
      : <div> Loading... </div>
  }
</div>
AccountPage.contextTypes = {
  authUser: PropTypes.object,
};
*/
class AccountPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }
    render()
    {
      return(
        <div>
          { this.state.authUser ?
              <div>
                  <h1>Account: {this.state.authUser.email}</h1>
                  <PasswordForgetForm />
                  <PasswordChangeForm />
              </div>
              : <div> Loading... </div>
          }
        </div>
      );
    }
}

AccountPage.contextTypes = {
  authUser: PropTypes.object,
};
export default AccountPage;
