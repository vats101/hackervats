// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
// import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';
// import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'


const firebaseConfig = {
  apiKey: "AIzaSyDkRBKGxW88YKtJcHBZ-5ZuNww7Dv4NAac",
  authDomain: "cart-42e1d.firebaseapp.com",
  projectId: "cart-42e1d",
  storageBucket: "cart-42e1d.appspot.com",
  messagingSenderId: "400034204836",
  appId: "1:400034204836:web:d6bc9682272a0220082a31"
};
// Use this to initialize the firebase App
const app = initializeApp(firebaseConfig);

// Use these for db & auth
const db = getFirestore(app);

export default db;