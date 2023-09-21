import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyA2LljLNoHOZgDow50YdyvL4ly2st6bimU",

  authDomain: "chatapp-a08f1.firebaseapp.com",

  projectId: "chatapp-a08f1",

  storageBucket: "chatapp-a08f1.appspot.com",

  messagingSenderId: "314335475865",

  appId: "1:314335475865:web:f76befb1941ccefb9ca008",
};


const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const firestore = getFirestore(app);

console.log("Firebase app:", app);
console.log("Firebase auth:", auth);
console.log("Firebase firestore:", firestore);


export { auth, firestore };
