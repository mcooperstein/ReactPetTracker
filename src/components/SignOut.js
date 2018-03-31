import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { auth } from '../firebase';

class SignOutButton extends Component{
  render(){
    return(
      <div>
        <button type="button" onClick={auth.doSignOut}>
          <Link to="/">Sign Out</Link>
        </button>
      </div>
    )
  }
}


export default SignOutButton;
