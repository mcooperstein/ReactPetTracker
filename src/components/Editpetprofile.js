import React, { Component } from 'react';
import { db,auth,firebase } from '../firebase';
import withAuthorization from './withAuthorization';
import {Link, withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import {calculateAge} from './Yourpets';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const INITIAL_STATE = {
  petname: "",
  dob: "",
  img: "",
  error: null,
};

const EditpetprofilePage = ({history ,match}) =>
  <div>
      <Editpetprofile history={history} match={match}/>
  </div>

class Editpetprofile extends Component {
  constructor(props)
  {
      super(props);
      this.state = {
        pet: [],
        modalIsOpen: false,
        petUrl: ""
      }
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.onUpdatePicture = this.onUpdatePicture.bind(this);

      console.log(this.props);

  }

    openModal(){
      this.setState({
        modalIsOpen: true
      })
    }

    closeModal(){
      this.setState({
        modalIsOpen: false
      })
    }
  onDelete()
  {
    const url_for_pet = this.state.petUrl;
    firebase.auth.onAuthStateChanged((user)=> {
      if (user) {
        db.deletePetProfile(user["uid"], url_for_pet).then(() =>
          this.props.history.push("/your-pets")
        );

      } else {
        window.location.href = '/';
        // if user is not logged in, go back to the home page
      }
    })
  }
  onUpdatePicture() {
    const {
      petname,
      img,
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
      const url_for_pet = this.state.petUrl;

      task.then((snapshot) => {
        firebase.auth.onAuthStateChanged((user)=> {
          if (user) {
            console.log(user["uid"], url_for_pet);
            db.changePetProfilePicture(user["uid"], url_for_pet, snapshot.downloadURL)
            .then(() => {
              this.setState(() => ({ ...INITIAL_STATE }));
              //this.setState({...INITIAL_STATE})
              history.push("/your-pets")
            })

            .catch(error => {
              this.setState(byPropKey('error', error));
            });

          } else {
          }
        })
      });

    event.preventDefault();
  }
  componentDidMount()
  {
    console.log(this.props.match.params.id);
    firebase.auth.onAuthStateChanged((user)=> {
      if (user) {
        db.getPet(user["uid"], this.props.match.params.id).then(snapshot =>
          // console.log(snapshot.val())
          this.setState(() => ({ pet: snapshot.val(), petUrl: this.props.match.params.id }))
        );

      } else {
        window.location.href = '/';
        // if user is not logged in, go back to the home page
      }
    })
  }
  render() {
    return (
      <div>
        <h1 id="edit-pet-profile-header">Edit Pet Profile for {this.state.pet["petname"]}</h1>
        <div className="card-deck">
          <div className="card"id="edit-pet-card">
            <div className="row">
            <div className="col-12 col-sm-4">
              <img className="card-img-top" id="edit-pet-img" src={this.state.pet.img} alt={`image of ${this.state.pet.petname}`}/>
            </div>
            <div className="col-12 col-sm-8">
              <h3 className="card-title">{this.state.pet.petname}</h3>
              <p className="card-text">Age: {calculateAge(this.state.pet.dob)}</p>
              <p className="card-text">Date of Birth: {this.state.pet.dob}</p>
              <label className="control-label">Upload New Profile Picture</label>
              <input type="file" id="upload-photo" required />
              <button className="btn btn-success" onClick={this.onUpdatePicture} style={{marginTop:"20px"}}>Edit Profile Picture</button>
            </div>
          </div>

          <div className="card-body" id="edit-pet-footer">
            <div className="form-group">
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
              id="how-it-works-modal"
            >
              <h2>Are you sure you want to Delete?<span id="are-you-sure-span">(this action cannot be undone)</span></h2>
              <button id="delete-profile" className="btn btn-danger btn-sm" onClick={this.onDelete}>Confirm Delete</button>
              <button id="cancel-delete" className="btn btn-secondary btn-sm" onClick={this.closeModal}>Cancel</button>
            </Modal>
              <button className="btn btn-danger btn-block" onClick={this.openModal}>Delete Profile</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditpetprofilePage);
