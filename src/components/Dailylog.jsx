import React, { Component } from 'react';
import { db,auth,firebase } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  time: '',
  content: ''
};

export default class Dailylog extends Component {
    constructor(props)
    {
        super(props);
        this.state = {dailyLog: []}
    }
    componentDidMount()
    {
        this.getLogs();
    }
    getLogs = () => {
      firebase.auth.onAuthStateChanged((user)=> {
        if (user) {
          db.getPetDailyLog(user["uid"], this.props.id).then(snapshot =>
            // console.log(snapshot.val())
            this.setState(() => ({ dailyLog: snapshot.val() }))
          );

        } else {
        }
      })
    }
    onSubmit = (event) =>{
      const {
        time,
        content,
      } = this.state;

      firebase.auth.onAuthStateChanged((user)=> {
        if (user) {
          console.log(user["uid"], this.props.id, time, content)
          db.addDailyLog(user["uid"], this.props.id, time, content)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            this.getLogs();
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
          <h2 className="text-center">Daily Log</h2>
          <div id="daily-logs-div">
            <PetDailyLogs dailyLog={this.state.dailyLog} petName={this.props.petName}/>
            <form onSubmit={this.onSubmit} className="form-group">
              <label className="control-label">Enter Time</label>
              <input
                className="form-control"
                placeholder="Enter Time"
                value={this.state.time}
                onChange={event => this.setState(byPropKey('time', event.target.value))}
              />
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
        </div>
      );
    }
  }

  const PetDailyLogs = ({ dailyLog, petName }) =>
    <div style={{maxHeight:'200px', overflow: 'auto'}}>
      {dailyLog ?
      Object.keys(dailyLog).map(key =>
        <div className="card" key={dailyLog[key].content}>
          <p className="text-center">{dailyLog[key].content} @ {dailyLog[key].time}</p>
        </div>) : <div>Nothing for {petName} today :(</div>
      }
    </div>
