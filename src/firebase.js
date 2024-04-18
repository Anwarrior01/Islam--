
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyD7fdVGc5ruSLFiUFda-w705yCmP7OP5rw",
  authDomain: "islam-e.firebaseapp.com",
  projectId: "islam-e",
  storageBucket: "islam-e.appspot.com",
  messagingSenderId: "292805036720",
  appId: "1:292805036720:web:a3613772b731cbb9b20975",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
