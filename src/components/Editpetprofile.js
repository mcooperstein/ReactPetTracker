import React, { Component } from 'react';
import { db,auth,firebase } from '../firebase';
import withAuthorization from './withAuthorization';
import {Link, withRouter} from 'react-router-dom';
import Modal from 'react-modal';

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
        <h1>Edit Pet Profile for {this.state.pet["petname"]}</h1>
        <div className="card-deck">
          <img className="card-img-top" src={this.state.pet.img} alt={`image of ${this.state.pet.petname}`}/>
          <div className="card-body">
            <h5 className="card-title">{this.state.pet.petname}</h5>
            <p className="card-text">Date of Birth: {this.state.pet.dob}</p>
            <div className="form-group">
              <label className="control-label">Edit Profile Picture {this.state.petUrl}</label>
            <input
              className="form-control"
              type="text"
              placeholder="Upload URL"
            />
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
              id="how-it-works-modal"
            >
              <h2>Are you sure you want to Delete?<span id="are-you-sure-span">(this action cannot be undone)</span></h2>
              <button id="delete-profile" className="btn btn-secondary btn-sm" onClick={this.onDelete}>Submit</button>
              <button id="cancel-delete" className="btn btn-secondary btn-sm" onClick={this.closeModal}>Cancel</button>
            </Modal>
              <button className="btn btn-success">Edit Profile Picture</button>
              <button className="btn btn-danger" onClick={this.openModal}>Delete Profile</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditpetprofilePage);
