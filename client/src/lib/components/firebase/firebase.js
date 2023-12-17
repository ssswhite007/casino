import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA2jsTyWnBXvRfgOhEFA0ZF31OaYTa4cQE",
  authDomain: "goodfriends-aa176.firebaseapp.com",
  projectId: "goodfriends-aa176",
  storageBucket: "goodfriends-aa176.appspot.com",
  messagingSenderId: "274086221017",
  appId: "1:274086221017:web:5754481b9b675cc5e45ac8"
};

firebase.initializeApp(firebaseConfig);

export default firebase;