import { auth } from './firebase'; // Adjust the path to your firebase.js file
import {  signInWithEmailAndPassword, signOut} from 'firebase/auth';

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

export const singin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
    
  } catch (error) {
    return false
  }
}

  export const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Logged out successfully');
      // Redirect to login page or update UI state after logout
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };