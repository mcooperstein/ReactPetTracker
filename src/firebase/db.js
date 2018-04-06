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

export const getPetAppointments = (id, url) =>
  db.ref(`users/${id}/pets/${url}/appointments`).once('value');

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

export const addAppointment = (id, url, date, time, content) =>
    db.ref(`users/${id}/pets/${url}/appointments`).push({
      date,
      time,
      content
});

export const completeAppointment = (id, url, record) =>
    db.ref(`users/${id}/pets/${url}/completed-appointments`).push({
      record
});
    db.ref(`users/${id}/pets/${url}/appointments/${record}`).remove();

export const getCompletedAppointments = (id, url) =>
  db.ref(`users/${id}/pets/${url}/completed-appointments`).once('value');

export const deleteMedicalRecord = (id,url,record) =>
  db.ref(`users/${id}/pets/${url}/medical-records/${record}`).remove();

export const deleteAppointment = (id,url,record) =>
  db.ref(`users/${id}/pets/${url}/appointments/${record}`).remove();

export const deleteDailyLog = (id, url) =>
    db.ref(`users/${id}/pets/${url}/daily-log`).remove();

export const deletePetProfile = (id, url) =>
  db.ref(`users/${id}/pets/${url}`).remove();

export const changePetProfilePicture = (id,url,img) =>
  db.ref(`users/${id}/pets/${url}`).update({img});
