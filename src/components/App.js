import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';


import Howitworks from './Howitworks.jsx';
import Addpetprofile from './Addpetprofile.jsx';
import Medicalrecord from './Medicalrecord.jsx';
import Dailylog from './Dailylog.jsx';
import Appointments from './Appointments.jsx';
import Yourpets from './Yourpets.jsx';
import Home from './Home.jsx';
import Navigation from './Navigation';
import AccountPage from './Account';
import SignInPage from './Signin';
import SignUpPage from './Signup';

import { firebase } from '../firebase';

class App extends Component {
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

  render() {
    return (
      <BrowserRouter>
          <div>
          <Navigation authUser={this.state.authUser}  />
          <Switch>
            <Route path="/how-it-works" component={Howitworks} />
            <Route path="/add-pet-profile" component={Addpetprofile} />
            <Route path="/your-pets/medical-record/:id" component={Medicalrecord} />
            <Route path="/your-pets/daily-log/:id" component={Dailylog} />
            <Route path="/your-pets/appointments/:id" component={Appointments} />
            <Route path="/your-pets" component={Yourpets} />
            <Route path="/account" component={AccountPage} authUser={this.state.authUser} />
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/" component={Home} />
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
