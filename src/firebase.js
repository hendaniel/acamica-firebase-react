// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzPYr9nP2ZIdhcozxBOgF7_ANrTQ6hYOs",
  authDomain: "fir-react-d78d6.firebaseapp.com",
  projectId: "fir-react-d78d6",
  storageBucket: "fir-react-d78d6.appspot.com",
  messagingSenderId: "854170342122",
  appId: "1:854170342122:web:f5400f7c255764b79afd93",
  measurementId: "G-THZ0YD42KZ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
