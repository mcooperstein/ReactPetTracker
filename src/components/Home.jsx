import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { db } from '../firebase';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : 'rgb(135,206,250)'
  }
};


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  render() {
    return (
      <div>
        <div id="home-container">
          <div id="left"></div>
          <div id="center"><h1 id="homepage-header">Welcome to Pet Tracker</h1></div>
          <div id="right"><button className="btn btn-info" onClick={this.openModal}>How it Works</button></div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          id="how-it-works-modal"
        >
          <h2 style={{color:'red', textAlign:'center'}}>How to Use Pet Tracker</h2>
          <p><b>Pet Tracker</b> is the ultimate application for keeping track of your pet's needs. Once you create a profile for your pet,
            you can keep track of your pet's needs across three important categories: medical history, daily notes, and upcoming appointments.</p>
          <p><b>Medical History</b> is a useful tool for storing information regarding your pet's medical history, such as the date they had their last check-up,
            or when they got their rabies vaccination.</p>
          <p><b>Daily Notes</b> are used for storing information about what your pet has done for the current day.
            For example, you may feed the pet on your way out and leave a note that said pet was fed at a certain time. If someone else arrives home afterwards, they
            can check the app to see that your pet was already fed, and avoid a situation where you may inadvertently feed it twice.</p>
          <p><b>Upcoming Appointments</b> is where you can enter and keep track of any upcoming appointments for your pet,
          and mark them as completed or delete them after the appointment is complete.</p>
          <Link className="btn btn-success" to="/sign-up">Sign up Today!</Link>
          <button id="modal-close" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
        </Modal>
        <img id="pet-collage" src="../../images/animalCollage.jpg"/>
      </div>
    );
  }
}
