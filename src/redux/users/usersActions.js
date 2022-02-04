import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  setDoc,
  serverTimestamp,
  updateDoc,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { auth, db } from 'db';
import {
  FETCH_ORDERS_HISTORY,
  FETCH_PRODUCTS_IN_CART,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
} from './usersConstants';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const usersRef = collection(db, 'users');

export const signUp =
  (username, email, password, confirmedPassword) => async (dispatch) => {
    if (
      username === '' ||
      email === '' ||
      password === '' ||
      confirmedPassword === ''
    ) {
      alert('Required fields are not filled in.');
      return false;
    }

    if (password !== confirmedPassword) {
      alert('Passwords do not match. Please try again.');
      return false;
    }

    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;

    if (user) {
      const uid = user.uid;
      const timestamp = serverTimestamp();

      const userInitialData = {
        created_at: timestamp,
        isSignedIn: true,
        email,
        role: 'customer',
        updated_at: timestamp,
        username,
      };

      const userRef = doc(usersRef, uid);

      await setDoc(userRef, userInitialData);

      dispatch({ type: SIGN_UP, payload: userInitialData });
    }
  };
