import React, { Component } from 'react';
import { db,auth,firebase } from '../firebase';
import withAuthorization from './withAuthorization';
import {Link} from 'react-router-dom';


export default class Topic extends Component {
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
        // db.yourPets(user["uid"]).then(snapshot =>
        //   console.log(snapshot.val())
        // )

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
          <p>{this.state.pet["petname"]}</p>
          <p>{this.state.pet["dob"]}</p>
          <p>{this.state.pet["img"]}</p>
      </div>
    );
  }
}
