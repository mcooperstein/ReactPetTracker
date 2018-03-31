import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCaNg0y_5YbU974_1MF1iN4L5GDdeDR7hM",
    authDomain: "pettracker-758d8.firebaseapp.com",
    databaseURL: "https://pettracker-758d8.firebaseio.com",
    projectId: "pettracker-758d8",
    storageBucket: "pettracker-758d8.appspot.com",
    messagingSenderId: "948100936737"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

const auth = firebase.auth();
const db = firebase.database();

export {
  db,
  auth,
};
