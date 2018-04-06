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
    console.log(Object.keys(this.state.pets))
    return (
      <div>
          <Petlist pets={this.state.pets} />
      </div>
    );
  }
}
export const Petlist = ({ pets }) =>
  <div>
    <h2 id="pet-list-header">List of your pets </h2>
    <div className="card-deck">
    {pets ?
    Object.keys(pets).map((key,index) =>
      <div className="card" style={{ maxWidth: "300px", minWidth: "300px"}} key={pets[key].petname}>
  <img className="card-img-top" style={{height:"300px"}} src={pets[key].img} alt={`image of ${pets[key].petname}`}/>
  <div className="card-body">
    {/* Pet # {index+1}
    <h5 className="card-title">{pets[key].petname}</h5> */}
    <div className="row">
      <div className="col-6">
        Pet # {index+1}
        <h5 className="card-title">{pets[key].petname}</h5>
      </div>
      <div className="col-6">
        <h6 style={{display:'inline'}}>Re-order</h6>
        <select id={`mySelect${index}`} onchange={changeFunc()}>
          <option value=""></option>
          {Object.keys(pets).map((key,index) =>
            <option value={`${index+1}`} key={index}>{index+1}</option>
          )}
        </select>
        {/* {<button className="btn btn-warning btn-sm" style={{float:'right'}} onClick={reOrder(1)}>Submit</button>} */}
      </div>
  </div>
    <p className="card-text">Age: {calculateAge(pets[key].dob)}</p>
    <p className="card-text">Date of Birth: {pets[key].dob}</p>
    <Link className="btn btn-primary" to={`/pets/${key}`}>{pets[key].petname} Profile</Link>
    <Link className="btn btn-success" to={`/edit-pet-profile/${key}`}>Edit Profile</Link>
  </div>
</div>) : <div>No pets :(</div> }
    </div>
  </div>

function reOrder(position){
  console.log(position)
}

function changeFunc() {
    var selectBox = document.getElementById("mySelect");
    console.log(selectBox)
    // var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    // alert(selectedValue);
   }

  export const calculateAge = (dob) => {
      var birthDate = new Date(dob);
      var currentDate = new Date();
      var time = currentDate - birthDate;
      var years = 1000*60*60*24*365;
      var months = (time/years) - Math.floor(time/years);
      years = Math.floor(time/years);
      months = Math.floor(months * 12);
      return `${years} years, ${months} months`;
  }

  const authCondition = (authUser) => !!authUser;

  export default withAuthorization(authCondition)(Yourpets);
