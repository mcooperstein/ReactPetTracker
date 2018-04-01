import React, { Component } from 'react';
import { db } from '../firebase';
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


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(){
    this.setState({
      modalIsOpen: true
    })
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
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
          <h1 id="homepage-header">Welcome to Pet Tracker</h1>
          <button className="btn btn-primary" onClick={this.openModal}>How it Works</button>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          id="how-it-works-modal"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>How it Works:</h2>
          <div>I am a modal</div>
          <button id="modal-close" className="btn btn-secondary btn-sm" onClick={this.closeModal}>close</button>
        </Modal>
        <img id="pet-collage" src="../../images/animalCollage.jpg"/>
      </div>
    );
  }
}
