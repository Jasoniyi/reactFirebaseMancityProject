import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPL-iQDK9Ylea6ASYbcozTZtFCxPXspnw",
  authDomain: "m-city-ed8b1.firebaseapp.com",
  databaseURL: "https://m-city-ed8b1.firebaseio.com",
  projectId: "m-city-ed8b1",
  storageBucket: "gs://m-city-ed8b1.appspot.com",
  messagingSenderId: "712420038133",
  appId: "1:712420038133:web:0391fbde41f0f983"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// variable to connect to firebase
const firebaseDB = firebase.database();

// passes reference of matches
const firebaseMatches = firebaseDB.ref("matches");
const firebasePromotions = firebaseDB.ref("promotions");
const firebaseTeams = firebaseDB.ref("teams");
const firebasePlayers = firebaseDB.ref("players");

export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebasePlayers,
  firebaseDB
};
