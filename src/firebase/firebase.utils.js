import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBVCBfOGhYN06jxjqqvWZI8DtXM9j2SMW0",
  authDomain: "top-db.firebaseapp.com",
  databaseURL: "https://top-db.firebaseio.com",
  projectId: "top-db",
  storageBucket: "top-db.appspot.com",
  messagingSenderId: "1054981008759",
  appId: "1:1054981008759:web:6bed717c90847956ce4572",
  measurementId: "G-MYPE3RDC3H",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user ", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
