// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();

export const googleLogin = () => auth.signInWithRedirect(provider);

export const logout = () => auth.signOut();

export const isLogged = () => {
  return !!auth?.currentUser?.uid;
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export default firebase;
