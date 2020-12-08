"use strict";
exports.__esModule = true;
exports.auth = exports.db = exports.firebaseApp = void 0;
var firebase_1 = require("firebase");
var firebaseConfig = {
    apiKey: "AIzaSyCN4RFANnNPstXjrULRl_V0v42Wqvzwqpk",
    authDomain: "channels-fc0e4.firebaseapp.com",
    projectId: "channels-fc0e4",
    storageBucket: "channels-fc0e4.appspot.com",
    messagingSenderId: "272489562154",
    appId: "1:272489562154:web:6691a4e401d31046f70353"
};
exports.firebaseApp = firebase_1["default"].initializeApp(firebaseConfig);
exports.db = exports.firebaseApp.firestore();
exports.auth = firebase_1["default"].auth();
