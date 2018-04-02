import React, { Component } from 'react';
import { db,auth,firebase } from '../firebase';
import withAuthorization from './withAuthorization';

class Yourpets extends Component {
  constructor(props)
  {
      super(props);

      this.state = {pets: []}
  }
  componentDidMount()
  {
    firebase.auth.onAuthStateChanged((user)=> {
      if (user) {
        db.yourPets(user["uid"]).then(snapshot =>
          // console.log(snapshot.val())
          this.setState(() => ({ pets: snapshot.val() }))
        );
      } else {
      }
    })
  }
  render() {

    return (
      <div>
          <Petlist pets={this.state.pets} />
      </div>
    );
  }
}
const Petlist = ({ pets }) =>
  <div>
    <h2>List of your pets </h2>
    {pets ?
    Object.keys(pets).map(key =>
      <div key={key}>{pets[key].petname}</div>
    ) : <div>No pets :(</div> }
  </div>

  const authCondition = (authUser) => !!authUser;

  export default withAuthorization(authCondition)(Yourpets);
