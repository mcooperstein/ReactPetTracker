import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

import reducers from './reducers';

import Howitworks from './components/Howitworks.jsx';
import Addpetprofile from './components/Addpetprofile.jsx';
import Medicalrecord from './components/Medicalrecord.jsx';
import Dailylog from './components/Dailylog.jsx';
import Appointments from './components/Appointments.jsx';
import Yourpets from './components/Yourpets.jsx';
import Home from './components/Home.jsx';
import Navigation from './components/Navigation';
import Account from './components/Account';
import Signin from './components/Signin';
import Signup from './components/Signup';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
      <Navigation />
      <Switch>
      <Route path="/how-it-works" component={Howitworks} />
      <Route path="/add-pet-profile" component={Addpetprofile} />
      <Route path="/your-pets/medical-record/:id" component={Medicalrecord} />
      <Route path="/your-pets/daily-log/:id" component={Dailylog} />
      <Route path="/your-pets/appointments/:id" component={Appointments} />
      <Route path="/your-pets" component={Yourpets} />
      <Route path="/account" component={Account} />
      <Route path="/sign-in" component={Signin} />
      <Route path="/sign-up" component={Signup} />
      <Route path="/" component={Home} />
    </Switch>
  </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
