import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { auth, db } from 'db';
import {
  FETCH_ORDERS_HISTORY,
  FETCH_PRODUCTS_IN_CART,
  SIGN_IN,
  SIGN_UP,
} from './constants';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const usersRef = collection(db, 'users');

// Fetch products in cart list
export const fetchProductsInCart = () => async (dispatch) => {
  const uid = auth.currentUser.uid;
  const userRef = await doc(usersRef, uid);
  const usersCartRef = await collection(userRef, 'cart');

  const snapshot = await getDocs(usersCartRef);

  const productsInCart = [];

  await snapshot.docs.forEach((doc) => {
    productsInCart.push({ ...doc.data(), id: doc.id });
  });

  dispatch({ type: FETCH_PRODUCTS_IN_CART, payload: productsInCart });
};

// Add selelcted product to cart
export const addProductToCart = (product) => async (dispatch) => {
  const uid = auth.currentUser.uid;
  const userRef = await doc(usersRef, uid);
  const usersCartRef = await collection(userRef, 'cart');
  const snapshot = await doc(usersCartRef);

  await setDoc(snapshot, product);
};

// Sign up user
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

// Sign in user
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

// Sign out user
export const signOut = () => async () => await auth.signOut();
