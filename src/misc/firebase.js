/* eslint-disable no-unused-vars */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyBJ8BIozm8m6Mh625DJyLDjKHrZi--120g',
  authDomain: 'chat-app-3d4b8.firebaseapp.com',
  projectId: 'chat-app-3d4b8',
  storageBucket: 'chat-app-3d4b8.appspot.com',
  messagingSenderId: '874785747372',
  appId: '1:874785747372:web:c2a6c234965321bbc8ca09',
  measurementId: 'G-W0MC2PE2VR',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database('https://chat-app-3d4b8-default-rtdb.asia-southeast1.firebasedatabase.app'); 