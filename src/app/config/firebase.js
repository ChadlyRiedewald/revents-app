import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'react-event-app-5223f.firebaseapp.com',
    projectId: 'react-event-app-5223f',
    storageBucket: 'react-event-app-5223f.appspot.com',
    messagingSenderId: '488147463891',
    appId: '1:488147463891:web:749c8a94dc28d77aa0ee26',
    databaseURL:
        'https://react-event-app-5223f-default-rtdb.europe-west1.firebasedatabase.app',
};

export const app = initializeApp(firebaseConfig);
