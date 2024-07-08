// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD63XC8JpbPsF6i_iqkuqBeQMN0b485fcI",
  authDomain: "waste-management-1f619.firebaseapp.com",
  projectId: "waste-management-1f619",
  storageBucket: "waste-management-1f619.appspot.com",
  messagingSenderId: "744083538696",
  appId: "1:744083538696:web:9387115d8328b97fc922bd",
  measurementId: "G-D7D0V2ZPC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;