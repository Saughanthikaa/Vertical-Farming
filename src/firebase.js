// src/firebase.js
import firebase from 'firebase/compat/app'; // Updated import statement
import 'firebase/compat/database'; // Updated import statement

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2s4TKqC5ByHSnOpUCaJ-JBsHZrzTUx6w",
  authDomain: "vertical-farming-6b1e8.firebaseapp.com",
  databaseURL: "https://vertical-farming-6b1e8-default-rtdb.firebaseio.com",
  projectId: "vertical-farming-6b1e8",
  storageBucket: "vertical-farming-6b1e8.appspot.com",
  messagingSenderId: "1072120648110",
  appId: "1:1072120648110:web:63a6345cb81bd533f3f83f",
  measurementId: "G-77SKBVW9MW"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
