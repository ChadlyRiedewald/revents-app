import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyD5dcaetq-Xeby7ieosTrjUWqoge4bNmA4',
    authDomain: 'react-event-app-5223f.firebaseapp.com',
    projectId: 'react-event-app-5223f',
    storageBucket: 'react-event-app-5223f.appspot.com',
    messagingSenderId: '488147463891',
    appId: '1:488147463891:web:749c8a94dc28d77aa0ee26',
    databaseURL:
        'https://react-event-app-5223f-default-rtdb.europe-west1.firebasedatabase.app',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
