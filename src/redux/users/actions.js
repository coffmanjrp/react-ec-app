import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { auth, db, timestamp } from 'db';
import {
  FETCH_USER,
  FETCH_ORDERS_HISTORY,
  FETCH_PRODUCTS_IN_CART,
  SIGN_IN,
  SIGN_UP,
} from './constants';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const usersRef = collection(db, 'users');

export const fetchUser = () => async (dispatch) => {
  const uid = auth.currentUser.uid;

  const userRef = await doc(usersRef, uid);
  const snapshot = await getDoc(userRef);
  const snapshotData = snapshot.data();
  const data = {
    ...snapshotData,
    uid,
  };
  delete data.created_at;
  delete data.updated_at;

  dispatch({ type: FETCH_USER, payload: data });
};

// Fetch products in cart list
export const fetchProductsInCart = () => async (dispatch, getState) => {
  const uid = getState().users.uid;
  const userRef = await doc(usersRef, uid);
  const usersCartRef = await collection(userRef, 'cart');

  const snapshot = await getDocs(usersCartRef);

  const productsInCart = [];

  await snapshot.docs.forEach((doc) => {
    const data = doc.data();
    delete data.added_at;

    productsInCart.push({ ...data, id: doc.id });
  });

  dispatch({ type: FETCH_PRODUCTS_IN_CART, payload: productsInCart });
};

export const fetchOrderHistory = () => async (dispatch, getState) => {
  const uid = getState().users.uid;
  const list = [];

  const userRef = await doc(usersRef, uid);
  const usersOrdersRef = await collection(userRef, 'orders');
  const q = query(usersOrdersRef, orderBy('updated_at', 'desc'));
  const snapshots = await getDocs(q);

  await snapshots.forEach((snapshot) => {
    const data = snapshot.data();
    delete data.created_at;
    delete data.updated_at;
    delete data.shipping_date;

    list.push(data);
  });

  dispatch({ type: FETCH_ORDERS_HISTORY, payload: list });
};

// Add selelcted product to cart
export const addProductToCart = (product) => async () => {
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
      const userInitialData = {
        created_at: timestamp,
        email,
        role: 'customer',
        updated_at: timestamp,
        username,
      };

      const userRef = await doc(usersRef, uid);

      await setDoc(userRef, userInitialData);

      delete userInitialData.created_at;
      delete userInitialData.updated_at;

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

// Reset password
export const resetPassword = (email) => async () => {
  if (email === '') {
    alert('Required fields are not filled in. Please filled in all fields.');
    return false;
  }
  try {
    await sendPasswordResetEmail(auth, email);

    alert('Password reset email has been sent.');
  } catch (error) {
    alert('There was an error. Please try again.');
    console.error(error);
  }
};
