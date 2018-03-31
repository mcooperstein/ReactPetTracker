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
import { withRouter } from 'react-router-dom';
import withAuthorization from './withAuthorization';

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
const AccountPage = ({ history }) =>
  <div>
      <Account history={history}/>
  </div>

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  accountupdate()
  {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }
  componentDidMount() {
      this.accountupdate();
  }
    render()
    {
      return(
        <div>
          { this.state.authUser ?
              <div>
                  <h1>Account: {this.state.authUser.email}</h1>
                  <PasswordForgetForm />
                  <hr/>
                  <PasswordChangeForm />
              </div>
              : <div> Loading... </div>
          }
        </div>
      );
    }
}
/*
AccountPage.contextTypes = {
  authUser: PropTypes.object,
};
*/
const authCondition = (authUser) => !!authUser;

//export default withRouter(AccountPage);

export default withAuthorization(authCondition)(AccountPage);
