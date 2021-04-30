import firebase from 'firebase';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyDH7NR2ro_SKJBSCLQtarN4VFKkBesXbxM",
    authDomain: "take-your-notes-56943.firebaseapp.com",
    projectId: "take-your-notes-56943",
    storageBucket: "take-your-notes-56943.appspot.com",
    messagingSenderId: "726932734116",
    appId: "1:726932734116:web:09d6f44de1fb301c902631"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export default  db;