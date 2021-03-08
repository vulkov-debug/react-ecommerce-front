import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1MCKLDPjK58INvOidTEas70tykkGu-0U",
  authDomain: "ecommerce-12a96.firebaseapp.com",
  projectId: "ecommerce-12a96",
  storageBucket: "ecommerce-12a96.appspot.com",
  messagingSenderId: "434129197374",
  appId: "1:434129197374:web:cc0e0694de833393c8b46f",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()