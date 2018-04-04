import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCQiMpNKku8GXFDti_HxhySKfSfy_sI5Ls",
    authDomain: "pet-tracker-f5647.firebaseapp.com",
    databaseURL: "https://pet-tracker-f5647.firebaseio.com",
    projectId: "pet-tracker-f5647",
    storageBucket: "pet-tracker-f5647.appspot.com",
    messagingSenderId: "835618976247"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage();
export {
  db,
  auth,
  storage
};
