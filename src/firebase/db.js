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

export const getPetDailyLog = (id, url) =>
  db.ref(`users/${id}/pets/${url}/daily-log`).once('value');

export const getPetRecords = (id, url) =>
  db.ref(`users/${id}/pets/${url}/medical-records`).once('value');

export const addDailyLog = (id, url, time, content) =>
    db.ref(`users/${id}/pets/${url}/daily-log`).push({
      time,
      content
});

export const addMedicalRecord = (id, url, date, content) =>
    db.ref(`users/${id}/pets/${url}/medical-records`).push({
      date,
      content
});

export const deleteMedicalRecord = (id,url,record) =>
  db.ref(`users/${id}/pets/${url}/medical-records/${record}`).remove();

export const deleteDailyLog = (id, url) =>
    db.ref(`users/${id}/pets/${url}/daily-log`).remove();

export const deletePetProfile = (id, url) =>
  db.ref(`users/${id}/pets/${url}`).remove();

export const changePetProfilePicture = (id,url,img) =>
  db.ref(`users/${id}/pets/${url}`).update({img});
