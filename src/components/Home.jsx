import React, { Component } from 'react';
import { db } from '../firebase';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}
