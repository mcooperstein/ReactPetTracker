import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAtLrdj9UtwaZe77sYOLMNoWGKDigYmGV8",
  authDomain: "reactpettracker.firebaseapp.com",
  databaseURL: "https://reactpettracker.firebaseio.com",
  projectId: "reactpettracker",
  storageBucket: "reactpettracker.appspot.com",
  messagingSenderId: "693981320170"
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
