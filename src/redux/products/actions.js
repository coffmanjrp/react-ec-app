import { push } from 'redux-first-history';
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
  where,
  getDoc,
  setDoc,
  writeBatch,
  Timestamp,
} from 'firebase/firestore';
import { auth, db, timestamp } from 'db';
import { FETCH_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT } from './constants';
import { setAlert } from '../alert/actions';
import { setLoading } from '../loading/actions';

const productsRef = collection(db, 'products');

// Fetch products collection from firebase
export const fetchProducts = (gender, category) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    let q = query(productsRef, orderBy('updated_at', 'desc'));
    q = gender ? query(productsRef, where('gender', '==', gender)) : q;
    q = category ? query(where('category', '==', category)) : q;

    const snapshot = await getDocs(q);

    const productList = [];

    await snapshot.docs.forEach((doc) => {
      const data = doc.data();
      delete data.created_at;
      delete data.updated_at;

      productList.push({ ...data, id: doc.id });
    });

    dispatch(setLoading(false));
    dispatch({ type: FETCH_PRODUCTS, payload: productList });
  } catch (error) {
    dispatch(setAlert('error', 'Faild fetching products'));
    console.error(error);
    return false;
  }
};

// Delete product from products collection
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const docRef = await doc(productsRef, id);

    await deleteDoc(docRef);

    const productState = getState().products.list;
    const filterdState = productState.filter((product) => product.id !== id);

    dispatch(setLoading(false));
    dispatch({ type: DELETE_PRODUCT, payload: filterdState });
  } catch (error) {
    dispatch(setAlert('error', 'Something went wrong. Try again later.'));
    console.error(error);
    return false;
  }
};

// Add or Update product to products collection
export const saveProduct =
  (id, uid, name, description, category, gender, price, images, sizes) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));

      let data = {
        uid,
        name,
        description,
        category,
        gender,
        price: parseInt(price, 10),
        images,
        sizes,
        updated_at: timestamp,
      };

      if (id) {
        const docRef = await doc(productsRef, id);

        if (id === '') {
          data = {
            ...data,
            id: docRef.id,
          };
        }

        await updateDoc(docRef, data);
      } else {
        const snapshot = await doc(productsRef);

        data = {
          ...data,
          id: snapshot.id,
          created_at: timestamp,
        };

        await setDoc(snapshot, data);
      }

      delete data.created_at;
      delete data.updated_at;

      dispatch(setLoading(false));
      dispatch(setAlert('success', 'Product saved successfully'));
      dispatch(push('/'));
      dispatch({ type: UPDATE_PRODUCT, payload: data });
    } catch (error) {
      dispatch(
        setAlert('error', 'Something went wrong. Please try again later.')
      );
      console.error(error);
      return false;
    }
  };

// Order product process
export const orderProduct = (productsInCart, amount) => async (dispatch) => {
  try {
    const uid = auth.currentUser.uid;
    const usersRef = await collection(db, 'users');
    const userRef = await doc(usersRef, uid);
    const usersCartsRef = await collection(userRef, 'cart');
    let products = [];
    let soldOutProducts = [];
    const batch = await writeBatch(db);

    dispatch(setLoading(true));

    for (const product of productsInCart) {
      const productRef = await doc(productsRef, product.pid);
      const snapshot = await getDoc(productRef);
      const sizes = snapshot.data().sizes;

      const updatedSizes = sizes.map((size) => {
        if (size.size === product.size) {
          if (size.quantity === 0) {
            soldOutProducts.push(product.name);
            return size;
          }
          return {
            size: size.size,
            quantity: size.quantity - 1,
          };
        } else {
          return size;
        }
      });

      products.push({
        id: product.pid,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      });

      await batch.update(productRef, { sizes: updatedSizes });
      await batch.delete(doc(usersCartsRef, product.id));
    }

    if (soldOutProducts.length > 0) {
      const errorMessage =
        soldOutProducts.length > 1
          ? soldOutProducts.join('and')
          : soldOutProducts[0];

      dispatch(setLoading(false));
      dispatch(
        setAlert(
          'error',
          `We are very sorry. The order process has been suspended because the ${errorMessage} are no longer in stock.`
        )
      );
    }

    await batch.commit();

    const ordersRef = await collection(userRef, 'orders');
    const orderDoc = await doc(ordersRef);
    const date = timestamp.toDate();
    const shippingDate = Timestamp.fromDate(
      new Date(date.setDate(date.getDate() + 3))
    );

    const history = {
      amount,
      created_at: timestamp,
      id: orderDoc.id,
      products,
      shipping_date: shippingDate,
      updated_at: timestamp,
    };

    await setDoc(orderDoc, history);

    setTimeout(() => {
      dispatch(setLoading(false));
      dispatch(
        setAlert('success', `Order ID ${history.id} orderd successfully!`)
      );
      dispatch(push('/'));
    }, 1000);
  } catch (error) {
    dispatch(setAlert('error', 'Order processing failed.'));
    console.error(error);
    return false;
  }
};
