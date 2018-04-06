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

export default class Medicalrecord extends Component {
  constructor(props)
  {
      super(props);
      this.state = {medicals: [], pet:[]}
      // this.state = {pet: []}
      console.log(this.props);
      console.log(this.props.match.params.id);
      // console.log(this.state)
  }
  componentDidMount()
  {
    this.getRecords();
  }
  displayDateWithYear = (event) => {
    var month = new Date().getMonth() +1;
    var dateNum = new Date().getDate();
    var year = new Date().getFullYear();
    let date = `${month}/${dateNum}/${year}`;
    this.setState(byPropKey('date', date))
  }
  getRecords = () => {
    firebase.auth.onAuthStateChanged((user)=> {
      if (user) {
        db.getPetRecords(user["uid"], this.props.match.params.id).then(snapshot =>
          //console.log(Object.keys(snapshot.val())[0])
          // console.log(snapshot.val())
          this.setState(() => ({medicals: snapshot.val()}))
        );
        db.getPet(user["uid"], this.props.match.params.id).then(snapshot =>
          // console.log(snapshot.val())
          this.setState(() => ({ pet: snapshot.val() }))
        );

      } else {
      }
    })
  }
  onSubmit = (event) => {
    const {
      date,
      content,
    } = this.state;

    firebase.auth.onAuthStateChanged((user)=> {
      if (user) {
        console.log(user["uid"], this.props.match.params.id, date, content)
        db.addMedicalRecord(user["uid"], this.props.match.params.id, date, content)
        .then(() => {
          this.setState(() => ({ ...INITIAL_STATE }));
          this.getRecords();
          //this.setState({...INITIAL_STATE})
        })

        .catch(error => {
          this.setState(byPropKey('error', error));
        });

      } else {
      }
    })

    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h1 id="pet-profile-header">Medical Records for {this.state.pet['petname']}</h1>
        <div className="row">
          <div className="col-6">
        <form id="medical-form" onSubmit={this.onSubmit} className="form-group">
          <h4 className="text-center">Add New Record</h4>
          <label className="control-label" style={{display:'block'}}>Enter Date</label>
          <div>
          <input
            className="form-control"
            placeholder="Enter Date"
            value={this.state.date}
            style={{display:'inline-block', width: '60%', padding: '4px 12px'}}
            onChange={event => this.setState(byPropKey('date', event.target.value))}
            required
          />
          <button className="btn btn-success btn-sm" style={{display:'inline-block', marginBottom:'3px', float:'right'}} onClick={this.displayDateWithYear}>Today's Date</button>
        </div>
          <label className="control-label">Enter Content</label>
          <input
            className="form-control"
            placeholder="Enter Content"
            value={this.state.content}
            onChange={event => this.setState(byPropKey('content', event.target.value))}
            required/>
          <button className="btn btn-primary btn-block" type="submit">Submit</button>
        </form>
      </div>
      <div className="col-6">
        <div id="medical-notes-div">
        <h4 className="text-center" style={{color:'white'}}>List of Medical Notes</h4>
        <PetRecords medicals={this.state.medicals} petName={this.state.pet['petname']}/>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

function deleteMedical(medicalRecord){
  firebase.auth.onAuthStateChanged((user)=> {
    if (user) {
      // db.deleteDailyLog(user["uid"], this.props.id).then(() =>
      //   // console.log(snapshot.val())
      //   this.getLogs()
      // );
      console.log(medicalRecord)

    } else {
    }
  })
}

const PetRecords = ({ medicals, petName }) =>
  <div>
    {medicals ?
    Object.keys(medicals).map(key =>
      <div className="card" key={medicals[key].content}>
        <p style={{margin:'5px', display:'inline-block'}}>{medicals[key].date}: {medicals[key].content}<button className="btn btn-danger btn-sm" style={{float:'right'}} onClick={console.log(key)}>Delete {key}</button></p>
      </div>) : <div className="text-center" style={{marginTop: '50px'}}><h4 style={{color: 'white', textDecoration:'underline'}}>* No Medical Notes for {petName} *</h4></div>
    }
  </div>
