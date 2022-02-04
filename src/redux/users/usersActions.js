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
  getDoc,
} from 'firebase/firestore';
import { auth, db } from 'db';
import {
  FETCH_ORDERS_HISTORY,
  FETCH_PRODUCTS_IN_CART,
  SIGN_IN,
  SIGN_UP,
} from './usersConstants';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

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
      const { uid } = user;
      const timestamp = serverTimestamp();

      const userInitialData = {
        created_at: timestamp,
        email,
        role: 'customer',
        updated_at: timestamp,
        username,
      };

      const userRef = await doc(usersRef, uid);

      await setDoc(userRef, userInitialData);

      dispatch({ type: SIGN_UP, payload: userInitialData });
    }
  };

export const signIn = (email, password) => async (dispatch) => {
  if (email === '' || password === '') {
    alert('Required fields are not filled in. Please filled in all fields.');
    return false;
  }

  const userCredentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredentials.user;

  if (user) {
    const { uid } = user;

    const userRef = await doc(usersRef, uid);
    const snapshot = await getDoc(userRef);
    const data = snapshot.data();

    const userData = {
      role: data.role,
      uid,
      username: data.username,
    };

    dispatch({ type: SIGN_IN, payload: userData });
  }
};

export const signOut = () => async () => await auth.signOut();
