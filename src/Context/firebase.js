import { initializeApp } from 'firebase/app';
import 'firebase/database';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8KJztt_CJTzo-SrBixRztltybIJQrOgA",
  authDomain: "react-contact-crud-4ec83.firebaseapp.com",
  projectId: "react-contact-crud-4ec83",
  storageBucket: "react-contact-crud-4ec83.appspot.com",
  messagingSenderId: "112999498287",
  appId: "1:112999498287:web:0654c5ef237d1a556abcda"
};

export const fireDb = initializeApp(firebaseConfig);
export const database = getDatabase(fireDb);

