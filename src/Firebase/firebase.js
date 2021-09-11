import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const config = {
  apiKey: "AIzaSyDYXVVYZOfHOjhrJEXyaDHn6FiiwoUMCJ0",
  authDomain: "social-media-app-d50d5.firebaseapp.com",
  projectId: "social-media-app-d50d5",
  storageBucket: "social-media-app-d50d5.appspot.com",
  messagingSenderId: "795963254186",
  appId: "1:795963254186:web:d7efbf2fbe07d37df0f7d3",
  measurementId: "G-SQGHQL1C34"
};

firebase.initializeApp(config);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };