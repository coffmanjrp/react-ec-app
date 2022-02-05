import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { db } from 'db';
import { FETCH_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT } from './constants';

const productsRef = collection(db, 'products');

// Fetch products collection from firebase
export const fetchProducts = (gender, category) => async (dispatch) => {
  let q = query(productsRef, orderBy('updated_at', 'desc'));
  q = gender ? query(productsRef, where('gender', '==', gender)) : q;
  q = category ? query(where('category', '==', category)) : q;

  const snapshot = await getDocs(q);

  const productList = [];

  await snapshot.docs.forEach((doc) =>
    productList.push({ ...doc.data(), id: doc.id })
  );

  dispatch({ type: FETCH_PRODUCTS, payload: productList });
};

// Delete product from products collection
export const deleteProduct = (id) => async (dispatch, getState) => {
  const docRef = await doc(productsRef, id);

  await deleteDoc(docRef);

  const productState = getState().products.list;
  const filterdState = productState.filter((product) => product.id !== id);

  dispatch({ type: DELETE_PRODUCT, payload: filterdState });
};

// Add or Update product to products collection
export const saveProduct =
  (id, name, description, category, gender, price, images, sizes) =>
  async (dispatch) => {
    const timestamp = serverTimestamp();

    const data = {
      name,
      description,
      category,
      gender,
      price: parseInt(price, 10),
      images,
      sizes,
      updated_at: timestamp,
    };

    const docRef = await doc(productsRef, id);

    if (id === '') {
      data.id = docRef.id;
      data.created_at = timestamp;
    }

    await updateDoc(docRef, data);

    dispatch({ type: UPDATE_PRODUCT, payload: data });
  };
