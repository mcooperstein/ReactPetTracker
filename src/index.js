import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Route path="/how-it-works" component={} />
      <Route path="/add-pet-profile" component={} />
      <Route path="/your-pets/medical-record/:id" component={} />
      <Route path="/your-pets/daily-log/:id" component={} />
      <Route path="/your-pets/appointments/:id" component={} />
      <Route path="/your-pets" component={} />
      <Route path="/" component={} />
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
