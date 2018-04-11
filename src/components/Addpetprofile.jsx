import React, { Component } from 'react';
import { db,auth,firebase } from '../firebase';
import {
  withRouter,
} from 'react-router-dom';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  petname: "",
  dob: "",
  img: "",
  ranking: "",
  error: null,
  pets: []
};

const Addpetprofile = ({history}) =>
  <div>
    <h1 id="create-pet-profile-header">Create New Pet Profile</h1>
    <Addpetpage history={history} />
  </div>

class Addpetpage extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }
  componentDidMount(){
    db.yourPets(authUser["uid"]).then(snapshot =>
      // console.log(snapshot.val())
      this.setState(() => ({ pets: snapshot.val() }))
    );
  }
  onSubmit = (event) => {
    const {
      petname,
      dob,
      img,
      ranking
    } = this.state;
    const {
      history,
    } = this.props;
    /*
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {


        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push("/");
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });

      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
      */
      const ref = firebase.storage.ref();
      const file = document.querySelector('#upload-photo').files[0];
      const name = (+new Date()) + '-' + file.name;
      const metadata = { contentType: file.type };
      const task = ref.child(name).put(file, metadata);

      task.then((snapshot) => {
        console.log(snapshot.downloadURL)
        firebase.auth.onAuthStateChanged((user)=> {
          if (user) {
            console.log(user["uid"], petname);
            db.addPetprofile(user["uid"], petname, dob, snapshot.downloadURL, Object.keys(this.state.pets).length+1)
            .then(() => {
              this.setState(() => ({ ...INITIAL_STATE }));
              //this.setState({...INITIAL_STATE})
              history.push("/your-pets")
            })

            .catch(error => {
              // this.setState(byPropKey('error', error));
              console.log('Error:',error);
            });

          } else {
          }
        })
      });

    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group" id="sign-up-form">
          <label className="control-label">Pet Name</label>
        <input
          className="form-control"
          value={this.state.petname}
          onChange={event => this.setState(byPropKey('petname', event.target.value))}
          type="text"
          placeholder="Pet Name"
        />

      <label className="control-label">Date of birth</label>
        <input
          className="form-control"
          value={this.state.dob}
          onChange={event => this.setState(byPropKey('dob', event.target.value))}
          type="text"
          placeholder="Format: MM/DD/YYYY"
        />
      {/*
      <label className="control-label">Upload image</label>
        <input
          className="form-control"
          value={this.state.img}
          onChange={event => this.setState(byPropKey('img', event.target.value))}
          type="text"
        />
      */}
      <label className="control-label">Upload Image</label>
      <input type="file" id="upload-photo" required />
      <img src={ this.state.img } />
        <button id="create-pet-button" type="submit" className="btn btn-primary btn-block">
          Add Pet
        </button>
        { this.state.error && <p>{this.state.error.message}</p> }
      </div>
      </form>
    );
  }
}


export default withRouter(Addpetprofile);
