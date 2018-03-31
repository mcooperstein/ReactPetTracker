import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
  render(){
    return(
      <div>
        <ul>
          <li><Link to="/sign-up">Sign Up</Link></li>
          <li><Link to="/sign-in">Sign In</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/account">Account</Link></li>
        </ul>
      </div>
    )
  }
}
