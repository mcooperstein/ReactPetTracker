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
import Topic from './Test';
import Editpetprofile from './Editpetprofile';
import Petprofile from './Petprofile';
import PasswordForgetPage from './PasswordForget';
import { firebase } from '../firebase';

const App = () => {
    return (
      <BrowserRouter>
          <div>
          <Navigation />
          <Switch>
            <Route path="/add-pet-profile" component={Addpetprofile} />
            <Route path="/edit-pet-profile" component={Editpetprofile} />
            <Route path="/pets/:id" component={Petprofile} />
            <Route path="/your-pets/medical-record/:name" component={Medicalrecord} />
            <Route path="/your-pets/daily-log/:name" component={Dailylog} />
            <Route path="/your-pets/appointments/:name" component={Appointments} />
            <Route path="/your-pets" component={Yourpets} />
            <Route path="/account" component={AccountPage}/>
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/pw-forget" component={PasswordForgetPage} />
            <Route path="/test/:name" component={Topic} />
            <Route path="/" component={Home} />
        </Switch>
        </div>
      </BrowserRouter>
    );
}

export default withAuthentication(App);
