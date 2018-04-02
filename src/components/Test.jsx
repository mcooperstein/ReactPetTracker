import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { db,auth,firebase } from '../firebase';

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      user: null
    };
  }

  componentDidMount() {
    /*
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
    */
    firebase.auth.onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
      } else {
        // No user is signed in.
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        { this.state.user }
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Test);
