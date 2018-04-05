import React, { Component } from 'react';
import { db,auth,firebase } from '../firebase';
import withAuthorization from './withAuthorization';
import {Link} from 'react-router-dom';
import Dailylog from './Dailylog';

export default class Petprofile extends Component {
    constructor(props)
    {
        super(props);

        this.state = {pet: []}
        console.log(this.props);
        console.log(this.props.match);
    }
    componentDidMount()
    {
      firebase.auth.onAuthStateChanged((user)=> {
        if (user) {
          db.getPet(user["uid"], this.props.match.params.id).then(snapshot =>
            // console.log(snapshot.val())
            this.setState(() => ({ pet: snapshot.val() }))
          );

        } else {
          window.location.href = '/';
          // if user is not logged in, go back to the home page
        }
      })
    }
    render() {

      return (
        <div className="container">
            <h1 id="pet-profile-header">{this.state.pet["petname"]}</h1>
            <div className="row">
            <div className="col-4">
              <h4 className="text-center">Medical History</h4>
            </div>
            <div className="col-4">
              <Dailylog id={this.props.match.params.id} petName={this.state.pet["petname"]}/>
            </div>
            <div className="col-4">
              <h4 className="text-center">Upcoming Appointments</h4>
            </div>
          </div>
        </div>
      );
    }
  }
