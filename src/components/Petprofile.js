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
          db.getPet(user["uid"], this.props.match.params.name).then(snapshot =>
            // console.log(snapshot.val())
            this.setState(() => ({ pet: snapshot.val() }))
          );

        } else {
        }
      })
    }
    render() {

      return (
        <div>
            <h1 id="pet-profile-header">{this.state.pet["petname"]}</h1>
            <Dailylog />
        </div>
      );
    }
  }
