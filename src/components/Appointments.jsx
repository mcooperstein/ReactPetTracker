import React, { Component } from 'react';
import { db,auth,firebase } from '../firebase';
import withAuthorization from './withAuthorization';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  date: '',
  content: ''
};

export default class Appointments extends Component {
  constructor(props)
  {
      super(props);
      this.state = {appointments: [], pet:[]}
      // this.state = {pet: []}
      console.log(this.props);
      console.log(this.props.match.params.id);
      // console.log(this.state)
  }
  componentDidMount()
  {
    this.getAppointments();
  }
  getAppointments = () => {
    firebase.auth.onAuthStateChanged((user)=> {
      if (user) {
        // db.getPetRecords(user["uid"], this.props.match.params.id).then(snapshot =>
        //   this.setState(() => ({appointments: snapshot.val()}))
        // );
        db.getPet(user["uid"], this.props.match.params.id).then(snapshot =>
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
        <h1 id="pet-profile-header">Upcoming Appointments for {this.state.pet['petname']}</h1>
      </div>
    );
  }
}
