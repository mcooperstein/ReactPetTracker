import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';

const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
      : <NavigationGuest />
    }
  </div>
class NavigationGuest extends Component {
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/sign-up">Sign up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sign-in">Sign in</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
class NavigationAuth extends Component {
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/account">Account</Link>
            </li>
            <li className="nav-item">
              <SignOutButton />
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

/*

*/


export default Navigation;
