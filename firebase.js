import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAM7v2gBoKXr_NU6hekVofgYMRjmDCGUjk",
  authDomain: "calcount-ffec5.firebaseapp.com",
  projectId: "calcount-ffec5",
  storageBucket: "calcount-ffec5.appspot.com",
  messagingSenderId: "344360627791",
  appId: "1:344360627791:web:6fa97e9512bf32dd8bc43a",
  measurementId: "G-M133P4LSE0",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();
export { auth, db };
