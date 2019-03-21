import firebase from "firebase/app";
import "firebase/firestore";

const dbConfig = {
  apiKey: "AIzaSyAh_UN5klQLOBaFxNORMDpRK1v5WRFXLSY",
  authDomain: "vue-blogs-5fd24.firebaseapp.com",
  databaseURL: "https://vue-blogs-5fd24.firebaseio.com",
  projectId: "vue-blogs-5fd24",
  storageBucket: "vue-blogs-5fd24.appspot.com",
  messagingSenderId: "1090768591530"
};

export const db = firebase.initializeApp(dbConfig).firestore();
