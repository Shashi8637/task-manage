// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDxKHvhvqqbY6TOhvqgTora339mv7A7hE8",
  authDomain: "todo-list-66f77.firebaseapp.com",
  projectId: "todo-list-66f77",
  storageBucket: "todo-list-66f77.appspot.com",
  messagingSenderId: "815294573451",
  appId: "1:815294573451:web:ec328d70b6d6e1ee84dd8e"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();