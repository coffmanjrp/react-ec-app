import { FETCH_PRODUCTS, DELETE_PRODUCTS } from './productsConstants';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  collection,
  getDocs,
} from 'firebase/firestore';
import { db } from 'db';

const productsRef = collection(db, 'products');

export const fetchProducts = () => async (dispatch) => {
  await getDocs(productsRef).then((snapshot) => {
    const productList = [];

    snapshot.docs.forEach((doc) =>
      productList.push({ ...doc.data(), id: doc.id })
    );

    dispatch({ type: FETCH_PRODUCTS, payload: productList });
  });
};
