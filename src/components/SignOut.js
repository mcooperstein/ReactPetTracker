import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { auth } from '../firebase';

class SignOutButton extends Component{
  refresh()
  {
    setTimeout(location.reload(), 1000);
  }
  render(){
    return(
      <div onClick={ this.refresh }>
        <button className="btn btn-warning" onClick={auth.doSignOut}>
          {/* <button type="button" onClick={this.setState(() => ({ authUser: null }))}> */}
          {/* <Link to="/">Sign Out</Link> */}
          Sign Out
        </button>
      </div>
    )
  }
}

export default SignOutButton;
