import React, { Component } from 'react';
import { db,auth,firebase } from '../firebase';
import withAuthorization from './withAuthorization';
import {Link} from 'react-router-dom';

import Select from 'react-select';
//import 'react-select/dist/react-select.css';


import { connect } from 'react-redux';
import { compose } from 'recompose';


class Yourpets extends Component {
  componentDidMount()
  {
    const { onSetPets } = this.props;

    firebase.auth.onAuthStateChanged((user)=> {
      if (user) {
        db.yourPets(user["uid"]).then(snapshot =>
          // console.log(snapshot.val())
          onSetPets(snapshot.val())
        );
      } else {
      }
    })
  }
  render() {
    // console.log(Object.keys(this.props.pets))
    const { yourpets,changePetRanking } = this.props;
    return (
      <div>
          <Petlist pets={ yourpets} changePetRanking={ changePetRanking }/>
      </div>
    );
  }
}
class Petlist extends Component {
  constructor(props)
  {
    super(props)

    this.state = { selectedRanking: ''}
  }
  handleRanking = (event, key) => {
    const { changePetRanking } = this.props;
    let data = this.props.pets;
    data[key].ranking = Number(event.target.value);
    firebase.auth.onAuthStateChanged((user)=> {
      if (user) {
        db.updateRankingOfPet(user["uid"], key, data[key].ranking).then(() =>
          // console.log(snapshot.val())
          changePetRanking(data)
        );
      } else {
      }
    })

  }
  render()
  {
    const { pets, selectedRanking } = this.props;
    const value = selectedRanking && selectedRanking.value;



    return(
      <div>
        <h2 id="pet-list-header">List of your pets </h2>
        <div className="card-deck">
        {pets ?
        Object.keys(pets).map((key,index) =>
          <div className="card" style={{ maxWidth: "300px", minWidth: "300px"}} key={pets[key].petname + key}>
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
              <select value={Number(pets[key].ranking)} onChange={(event) => this.handleRanking(event, key)}>
                { Object.keys(pets).map((key,index) =>
                    <option value={Number(index+1)} key={key + index}>{Number(index+1)}</option>
                  )
                }
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
    );
  }
}

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

  const mapStateToProps = (state) => {
    //pets: state.petState.pets,
    //console.log("mapStateToProps", state)
    if(state.petsState)
    {
        console.log("=>>", state.petsState.yourpets)
        return { yourpets: state.petsState.yourpets}
    } else {
      console.log("failed", state)
      return { yourpets: {}}
    }
}

  const mapDispatchToProps = (dispatch) => ({
    onSetPets: (yourpets) => dispatch({ type: 'PETS_SET', yourpets }),
    changePetRanking: (yourpets, selectedRanking, key) => dispatch({type: 'RANK_SET',yourpets, selectedRanking, key })
  });


  const authCondition = (authUser) => !!authUser;

  // export default withAuthorization(authCondition)(Yourpets);

  export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps)
  )(Yourpets);
