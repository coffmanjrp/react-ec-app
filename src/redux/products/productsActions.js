import { FETCH_PRODUCTS, DELETE_PRODUCTS } from './productsConstants';
import {
  collection,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from 'db';

const productsRef = collection(db, 'products');

export const fetchProducts = () => async (dispatch) => {
  const productList = [];

  const snapshot = await getDocs(productsRef);

  await snapshot.docs.forEach((doc) =>
    productList.push({ ...doc.data(), id: doc.id })
  );

  dispatch({ type: FETCH_PRODUCTS, payload: productList });
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  const docRef = await doc(productsRef, id);

  await deleteDoc(docRef);

  const productState = getState().products.list;
  const filterdState = productState.filter((product) => product.id !== id);

  dispatch({ type: DELETE_PRODUCTS, payload: filterdState });
};
