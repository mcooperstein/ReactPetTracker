import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

import reducers from './reducers';
/*
import Howitworks from './components/Howitworks.jsx';
import Addpetprofile from './components/Addpetprofile.jsx';
import Medicalrecord from './components/Medicalrecord.jsx';
import Dailylog from './components/Dailylog.jsx';
import Appointments from './components/Appointments.jsx';
import Yourpets from './components/Yourpets.jsx';
import Home from './components/Home.jsx';
import Navigation from './components/Navigation';
import Account from './components/Account';
import SignInPage from './components/Signin';
import SignUpPage from './components/Signup';
*/

import App from './components/App';
const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <App/>
  </Provider>
  , document.querySelector('.app'));
