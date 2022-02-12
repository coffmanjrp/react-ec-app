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
import { db, timestamp } from 'db';
import { FETCH_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT } from './constants';

const productsRef = collection(db, 'products');

// Fetch products collection from firebase
export const fetchProducts = (gender, category) => async (dispatch) => {
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

    delete data.updated_at;

    dispatch({ type: UPDATE_PRODUCT, payload: data });
  };

// Order product process
export const orderProduct = (productsInCart, amount) => async (getState) => {
  try {
    const uid = getState().users.uid;
    const usersRef = await collection(db, 'users');
    const userRef = await doc(usersRef, uid);
    const usersCartsRef = await collection(userRef, 'cart');
    let products = [];
    let soldOutProducts = [];
    const batch = await writeBatch(db);

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
      alert(
        `We are very sorry. The order process has been suspended because the ${errorMessage} are no longer in stock.`
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
  } catch (error) {
    alert('Order processing failed.');
    console.error(error);
    return false;
  }
};
