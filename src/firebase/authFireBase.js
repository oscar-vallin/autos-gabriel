import { auth } from './firebase'; // Adjust the path to your firebase.js file
import {  signInWithEmailAndPassword } from 'firebase/auth';

// export const registerUser = (email, password) => {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // User registration successful
//       const user = userCredential.user;
//       console.log('User registered:', user);
//     })
//     .catch((error) => {
//       // Handle errors
//       console.error('Error registering user:', error);
//     });
// };

export const singin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // User signed in
    const user = userCredential.user;
    console.log('User logged in:', user);
  })
  .catch((error) => {
    // Handle errors
    console.error('Error logging in:', error);
  })};