import React, { Component } from 'react';
import { db,auth,firebase } from '../firebase';
import withAuthorization from './withAuthorization';
import {Link} from 'react-router-dom';

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
export const Petlist = ({ pets }) =>
  <div>
    <h2>List of your pets </h2>
    <div className="card-deck">
    {pets ?
    Object.keys(pets).map(key =>
      <div className="card" style={{ maxWidth: "300px"}} key={pets[key].petname}>
  <img className="card-img-top" src={pets[key].img} alt={`image of ${pets[key].petname}`}/>
  <div className="card-body">
    <h5 className="card-title">{pets[key].petname}</h5>
    <p className="card-text">Date of Birth: {pets[key].dob}</p>
    <Link className="btn btn-primary" to={`/pets/${key}`}>{pets[key].petname} Profile</Link>
    <Link className="btn btn-success" to={`/edit-pet-profile/${key}`}>Edit Profile</Link>
  </div>
</div>) : <div>No pets :(</div> }
    </div>
  </div>

  const authCondition = (authUser) => !!authUser;

  export default withAuthorization(authCondition)(Yourpets);
