import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2LiUMrxi3T_hZCIkGVNWcVKLe0GRkAos",
  authDomain: "cooking-rating.firebaseapp.com",
  projectId: "cooking-rating",
  storageBucket: "cooking-rating.firebasestorage.app",
  messagingSenderId: "605149100590",
  appId: "1:605149100590:web:04da9b33ca6412e6323dbf",
  measurementId: "G-VSMW8TET7N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
window.setDoc = setDoc;
window.doc = doc;
window.getDocs = getDocs;
window.collection = collection;
