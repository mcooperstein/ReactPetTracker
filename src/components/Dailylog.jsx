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
    deleteLogs = () => {
      firebase.auth.onAuthStateChanged((user)=> {
        if (user) {
          db.deleteDailyLog(user["uid"], this.props.id).then(() =>
            // console.log(snapshot.val())
            this.getLogs()
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
    populateTime =(event)=>{
      var currentTime = new Date(),
      hours = currentTime.getHours(),
      minutes = currentTime.getMinutes();

	     if (minutes < 10) {
	        minutes = "0" + minutes;
        }
	     var suffix = "AM";
	        if (hours >= 12) {
            suffix = "PM";
            hours = hours - 12;
	         }
	        if (hours == 0) {
	          hours = 12;
	         }
      let time =`${hours}:${minutes} ${suffix}`
      // return `${hours}:${minutes} ${suffix}`
      // console.log(`${hours}:${minutes} ${suffix}`)
      this.setState(byPropKey('time', time))
    }
    render() {
      return (
        <div>
          <h4 className="text-center">Daily Log</h4>
          <div id="daily-logs-div">
            <p style={{fontWeight:'bolder', display: 'inline-block'}}>{displayDate()}</p>
            <button className="btn btn-danger btn-sm" style={{float: 'right'}} onClick={this.deleteLogs}>Clear All</button>
            <PetDailyLogs dailyLog={this.state.dailyLog} petName={this.props.petName}/>
            <form onSubmit={this.onSubmit} className="form-group">
              <label className="control-label" style={{display:'block'}}>Enter Time</label>
              <div>
              <input
                className="form-control"
                placeholder="Enter Time"
                value={this.state.time}
                style={{display:'inline-block', width: '50%', padding: '4px 12px'}}
                onChange={event => this.setState(byPropKey('time', event.target.value))}
                required
              />
              <button className="btn btn-success btn-sm" style={{display:'inline-block', marginBottom:'3px'}} onClick={this.populateTime}>Current Time</button>
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
        </div>
      );
    }
  }

  function displayDate(){
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    var currentDay = new Date().getDay();
    var dayOfWeek = days[currentDay-1];
    var currentMonth = new Date().getMonth();
    var month = months[currentMonth];
    var dateNum = new Date().getDate();
    return `${dayOfWeek} ${month} ${dateNum}`;
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
