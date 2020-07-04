import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdhZHDHfXE9e1xbgqUfCoerVSsGmgbZPI",
  authDomain: "ring-6c2f7.firebaseapp.com",
  databaseURL: "https://ring-6c2f7.firebaseio.com",
  projectId: "ring-6c2f7",
  storageBucket: "ring-6c2f7.appspot.com",
  messagingSenderId: "1010354351680",
  appId: "1:1010354351680:web:c0aeb9c7bb7a87187d39a5",
  measurementId: "G-YQBJYSPBJZ",
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export default firebase;
