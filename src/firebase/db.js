import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const addPetprofile = (id, petname, dob, img) =>
  db.ref(`users/${id}/pets`).push({
    petname,
    dob,
    img,
  });

export const yourPets = (id) =>
  db.ref(`users/${id}/pets`).once('value');

export const getPet = (id, url) =>
  db.ref(`users/${id}/pets/${url}`).once('value');
