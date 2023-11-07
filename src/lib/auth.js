import {
  signInWithPopup, auth, provider, createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from './firebase.js';

export const loginGoogle = () => signInWithPopup(auth, provider);

export const registerNewUser = (email, password) => createUserWithEmailAndPassword (auth, email, password);

export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
