import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDorvSThQaJhfaQd7tZtBUf-JAZbJswzdI",
  authDomain: "instagram-clone-react-c7a8e.firebaseapp.com",
  projectId: "instagram-clone-react-c7a8e",
  storageBucket: "instagram-clone-react-c7a8e.appspot.com",
  messagingSenderId: "947288346295",
  appId: "1:947288346295:web:fee402774c4d4389b54732",
  measurementId: "G-BWVG2M1TNJ"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

//export default db;