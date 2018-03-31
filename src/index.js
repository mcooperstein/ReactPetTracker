import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import App from './components/app';
import reducers from './reducers';

import Howitworks from './components/Howitworks.jsx';
import Addpetprofile from './components/Addpetprofile.jsx';
import Medicalrecord from './components/Medicalrecord.jsx';
import Dailylog from './components/Dailylog.jsx';
import Appointments from './components/Appointments.jsx';
import Yourpets from './components/Yourpets.jsx';
import Home from './components/Home.jsx';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Route path="/how-it-works" component={Howitworks} />
      <Route path="/add-pet-profile" component={Addpetprofile} />
      <Route path="/your-pets/medical-record/:id" component={Medicalrecord} />
      <Route path="/your-pets/daily-log/:id" component={Dailylog} />
      <Route path="/your-pets/appointments/:id" component={Appointments} />
      <Route path="/your-pets" component={Yourpets} />
      <Route path="/" component={Home} />
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
