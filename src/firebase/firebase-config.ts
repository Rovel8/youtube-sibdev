import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCN4RFANnNPstXjrULRl_V0v42Wqvzwqpk",
    authDomain: "channels-fc0e4.firebaseapp.com",
    projectId: "channels-fc0e4",
    storageBucket: "channels-fc0e4.appspot.com",
    messagingSenderId: "272489562154",
    appId: "1:272489562154:web:6691a4e401d31046f70353"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()
export const auth =  firebase.auth()