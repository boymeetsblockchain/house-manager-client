// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMzoEZwQcXdiMRmQqf2b_5E5hclITG0lc",
  authDomain: "housemanager-db819.firebaseapp.com",
  projectId: "housemanager-db819",
  storageBucket: "housemanager-db819.appspot.com",
  messagingSenderId: "33091786192",
  appId: "1:33091786192:web:8d69a74658b1087191d5d5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 export const storage = getStorage(app)