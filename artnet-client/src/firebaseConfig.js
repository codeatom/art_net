import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB7bvdWw3eZHUZEF2U5PmzPzyYtup3mN4w",
  authDomain: "art-net-acf79.firebaseapp.com",
  projectId: "art-net-acf79",
  storageBucket: "art-net-acf79.appspot.com",
  messagingSenderId: "487082005256",
  appId: "1:487082005256:web:474de0bb46064898e012bd"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);