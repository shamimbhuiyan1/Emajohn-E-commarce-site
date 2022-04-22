import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrdoO6gpAQD24ucFi4Xmdd4jdbuprfXFY",
  authDomain: "ema-jhon-simple-15fb5.firebaseapp.com",
  projectId: "ema-jhon-simple-15fb5",
  storageBucket: "ema-jhon-simple-15fb5.appspot.com",
  messagingSenderId: "947711331443",
  appId: "1:947711331443:web:f0cdabe0e8b19bf1436e06",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
