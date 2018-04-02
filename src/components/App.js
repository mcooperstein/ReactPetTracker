import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import withAuthentication from './withAuthentication';

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
import Test from './Test';
import Editpetprofile from './Editpetprofile';

import { firebase } from '../firebase';

const App = () => {
    return (
      <BrowserRouter>
          <div>
          <Navigation />
          <Switch>
            <Route path="/add-pet-profile" component={Addpetprofile} />
            <Route path="/edit-pet-profile" component={Editpetprofile} />
            <Route path="/your-pets/medical-record/:id" component={Medicalrecord} />
            <Route path="/your-pets/daily-log/:id" component={Dailylog} />
            <Route path="/your-pets/appointments/:id" component={Appointments} />
            <Route path="/your-pets" component={Yourpets} />
            <Route path="/account" component={AccountPage}/>
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/test" component={Test} />
            <Route path="/" component={Home} />
        </Switch>
        </div>
      </BrowserRouter>
    );
}

export default withAuthentication(App);
