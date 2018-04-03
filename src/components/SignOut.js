import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { auth } from '../firebase';

class SignOutButton extends Component{
  render(){
    return(
      <div>
        <button className="btn btn-warning" onClick={auth.doSignOut}>
          {/* <button type="button" onClick={this.setState(() => ({ authUser: null }))}> */}
          <Link to="/">Sign Out</Link>
        </button>
      </div>
    )
  }
}

export default SignOutButton;
