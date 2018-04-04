import React, { Component } from 'react';
import { db,auth,firebase } from '../firebase';
import withAuthorization from './withAuthorization';
import {Link} from 'react-router-dom';


class Topic extends Component {
  constructor(props)
  {
      super(props);

  }
  imageUpload()
  {
    console.log(firebase);

    const ref = firebase.storage.ref();
    const file = document.querySelector('#photo').files[0];
    const name = (+new Date()) + '-' + file.name;
    const metadata = { contentType: file.type };
    const task = ref.child(name).put(file, metadata);

    task.then((snapshot) => {
        console.log(snapshot.downloadURL);
    });

    
  }
  componentDidMount()
  {

  }
  render() {

    return (
      <div>
        <input type="file" id="photo" />
        <button className="btn btn-danger btn-block" onClick={ this.imageUpload }>
          Upload image
        </button>
      </div>
    );
  }
}


const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Topic);
