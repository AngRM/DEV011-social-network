// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, getDocs } from "firebase/firestore";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD48lDcsB70vmPGDuT-mqo5QBhaXNP7b5k',
  authDomain: 'yummy-4934a.firebaseapp.com',
  projectId: 'yummy-4934a',
  storageBucket: 'yummy-4934a.appspot.com',
  messagingSenderId: '140040877244',
  appId: '1:140040877244:web:278cfabc7731bc63f18cb9',
  measurementId: 'G-BERPZQCZPD',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
// Usuario loggeado*
// onAuthStateChanged (auth, user => {
//     console.log("Entraste");
// } else {
//     console.log("No entraste");
// }
// });
const provider = new GoogleAuthProvider();

export const loginGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      return user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      return error;
    });
};
