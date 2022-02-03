import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'db';
import {
  FETCH_PRODUCTS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from './productsConstants';

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

  dispatch({ type: DELETE_PRODUCT, payload: filterdState });
};

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
      updatedAt: timestamp,
    };

    const docRef = await doc(productsRef, id);

    if (id === '') {
      data.id = docRef.id;
      data.createdAt = timestamp;
    }

    await updateDoc(docRef, data);

    dispatch({ type: UPDATE_PRODUCT, payload: data });
  };
