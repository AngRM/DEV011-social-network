import {
  signInWithPopup, auth, provider, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, db, collection, addDoc,
} from './firebase.js';

export const loginGoogle = () => signInWithPopup(auth, provider);

// eslint-disable-next-line max-len
export const registerNewUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const storeUserInfo = (info) => addDoc(collection(db, 'users'), info);
