import React, { Component } from 'react';
import { db,auth,firebase } from '../firebase';
import withAuthorization from './withAuthorization';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  date: '',
  time: '',
  content: ''
};

export default class Appointments extends Component {
  constructor(props)
  {
      super(props);
      this.state = {appointments: [], pet:[], completedAppointments: []}
      // this.state = {pet: []}
      console.log(this.props);
      console.log(this.props.match.params.id);
      // console.log(this.state)
  }
  componentDidMount()
  {
    this.getAppointments();
    this.showCompletedAppointments();
  }
  getAppointments = () => {
    firebase.auth.onAuthStateChanged((user)=> {
      if (user) {
        db.getPetAppointments(user["uid"], this.props.match.params.id).then(snapshot =>
          this.setState(() => ({appointments: snapshot.val()}))
        );
        db.getPet(user["uid"], this.props.match.params.id).then(snapshot =>
          // console.log(snapshot.val())
          this.setState(() => ({ pet: snapshot.val() }))
        );

      } else {
      }
    })
  }
  showCompletedAppointments = () => {
    firebase.auth.onAuthStateChanged((user)=> {
      if (user) {
        db.getCompletedAppointments(user["uid"], this.props.match.params.id).then(snapshot =>
          this.setState(() => ({completedAppointments: snapshot.val()}))
        );
        db.getPetAppointments(user["uid"], this.props.match.params.id).then(snapshot =>
          this.setState(() => ({appointments: snapshot.val()}))
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
      time,
      content,
    } = this.state;

    firebase.auth.onAuthStateChanged((user)=> {
      if (user) {
        console.log(user["uid"], this.props.match.params.id, date, time, content)
        db.addAppointment(user["uid"], this.props.match.params.id, date, time, content)
        .then(() => {
          this.setState(() => ({ ...INITIAL_STATE }));
          this.getAppointments();
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
  onDeleteAppointment = (key) => {
    firebase.auth.onAuthStateChanged((user)=> {
      if (user) {
        db.deleteAppointment(user["uid"], this.props.match.params.id, key).then(() =>
          // console.log('Delete worked', key)
          this.getAppointments()
        );
      } else {
      }
    })
  }
  onDeleteCompletedAppointment = (key) => {
    firebase.auth.onAuthStateChanged((user)=> {
      if (user) {
        db.deleteCompletedAppointment(user["uid"], this.props.match.params.id, key).then(() =>
          // console.log('Delete worked', key)
          this.showCompletedAppointments()
        );
      } else {
      }
    })
  }
  onCompleteAppointment = (date, time, content, key) => {
    firebase.auth.onAuthStateChanged((user)=> {
      if (user) {
        db.completeAppointment(user["uid"], this.props.match.params.id, date, time, content, key).then(() =>
          //console.log('Completed worked', key)
          this.showCompletedAppointments()
        )
        db.deleteAppointment(user["uid"], this.props.match.params.id, key).then(() =>
          // console.log('Delete worked', key)
          this.getAppointments()
        );
      } else {
      }
    })
  }
  render() {
    return (
      <div>
        <h1 id="pet-profile-header">Upcoming Appointments for {this.state.pet['petname']}</h1>
        <div className="row">
          <div className="col-4">
        <form id="appointment-form" onSubmit={this.onSubmit} className="form-group" style={{height:'100%', padding:'25px 25px 0px 25px'}}>
          <h4 className="text-center">Add New Appointment</h4>
          <label className="control-label" style={{display:'block'}}>Enter Date</label>
          <input
            className="form-control"
            placeholder="Enter Date"
            value={this.state.date}
            onChange={event => this.setState(byPropKey('date', event.target.value))}
            required
          />
          <label className="control-label" style={{display:'block'}}>Enter Time</label>
          <input
            className="form-control"
            placeholder="Enter Time"
            value={this.state.time}
            onChange={event => this.setState(byPropKey('time', event.target.value))}
            required
          />
          <label className="control-label">Enter Content</label>
          <input
            className="form-control"
            placeholder="Enter Content"
            value={this.state.content}
            onChange={event => this.setState(byPropKey('content', event.target.value))}
            required/>
          <button className="btn btn-primary btn-block" type="submit" style={{marginTop:'0px'}}>Submit</button>
        </form>
      </div>
      <div className="col-8">
        <div id="appointment-notes-div" style={{minHeight: '326px', maxHeight: '326px'}}>
        <h4 className="text-center" style={{color:'white'}}>List of Upcoming Appointments</h4>
        {/* <PetRecords medicals={this.state.medicals} petName={this.state.pet['petname']}/> */}
        {/* {Object.keys(this.state.medicals).length>0? Object.keys(this.state.medicals).map(key=>
        <p>{this.state.medicals[key].content}</p>): <p>No items</p>} */}
        <div style={{maxHeight:'250px', overflow: 'scroll'}}>
        {this.state.appointments!==null? Object.keys(this.state.appointments).map(key=>
          <div className="card" key={this.state.appointments[key].date+key}>
            <p style={{margin:'5px', display:'inline-block'}}>{this.state.appointments[key].date} @ {this.state.appointments[key].time}: {this.state.appointments[key].content}
              {/* <button className="btn btn-danger btn-sm" style={{float:'right'}} onClick={this.onDeleteRecord(key)}>Delete</button> */}
              <button className="btn btn-success btn-sm" style={{float:'right'}} onClick={()=>this.onCompleteAppointment(this.state.appointments[key].date,this.state.appointments[key].time,this.state.appointments[key].content,key)}>Completed</button>
              <button className="btn btn-danger btn-sm" style={{float:'right'}} onClick={()=>this.onDeleteAppointment(key)}>Delete</button>
            </p>
          </div>): <div className="text-center" style={{marginTop: '50px'}}><h4 style={{color: 'white', textDecoration:'underline'}}>* No Appointments scheduled for {this.state.pet['petname']} *</h4></div>}
        </div>
      </div>
      </div>
      </div>
      <div className="col-8 float-right">
        <div id="past-appointments-div">
          <h4 className="text-center">Completed Appointments</h4>
          <div style={{maxHeight:'250px', overflow: 'scroll'}}>
          {this.state.completedAppointments!==null? Object.keys(this.state.completedAppointments).map(key=>
            <div className="card" key={this.state.completedAppointments[key].date+key}>
              <p style={{margin:'5px', display:'inline-block'}}>{this.state.completedAppointments[key].date} @ {this.state.completedAppointments[key].time}: {this.state.completedAppointments[key].content}
                {/* <button className="btn btn-danger btn-sm" style={{float:'right'}} onClick={console.log(this.state.appointments[key].completed)}>Delete</button> */}
                <button className="btn btn-danger btn-sm" style={{float:'right'}} onClick={()=>this.onDeleteCompletedAppointment(key)}>Delete</button>
              </p>
            </div>
          ): <div className="text-center" style={{marginTop: '10px'}}><h4 style={{color: 'black', textDecoration:'underline'}}>* No Completed for {this.state.pet['petname']} *</h4></div>}
          </div>
        </div>
      </div>
      </div>
    );
  }
}
