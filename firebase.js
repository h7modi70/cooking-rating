import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
getFirestore,
doc,
setDoc,
getDocs,
collection
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
apiKey:"YOUR",
authDomain:"YOUR",
projectId:"YOUR",
appId:"YOUR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db=db;
window.setDoc=setDoc;
window.doc=doc;
window.getDocs=getDocs;
window.collection=collection;
