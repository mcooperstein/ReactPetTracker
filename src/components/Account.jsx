import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PasswordChangeForm from './PasswordChange';
import { firebase, db, auth } from '../firebase';
import { withRouter } from 'react-router-dom';
import { Petlist } from './Yourpets';
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
// const Account = ({ history }) =>
//   <div>
//       <Account history={history}/>
//   </div>

class AccountPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  accountUpdate()
  {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }
  componentDidMount() {
      this.accountUpdate();
  }
    render()
    {
      return(
        <div>
          { this.state.authUser ?
              <div>
                  <h4>Account Username: {this.state.authUser.email}</h4>
                  <h6>Number of Pets: (WANT TO DISPLAY THIS INFO)</h6>
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
