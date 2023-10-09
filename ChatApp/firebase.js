// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2LljLNoHOZgDow50YdyvL4ly2st6bimU",

  authDomain: "chatapp-a08f1.firebaseapp.com",

  databaseURL: "https://chatapp-a08f1-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "chatapp-a08f1",

  storageBucket: "chatapp-a08f1.appspot.com",

  messagingSenderId: "314335475865",

  appId: "1:314335475865:web:ade94e268c358c899ca008",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const firestore = getFirestore(app);

export {auth, firestore}