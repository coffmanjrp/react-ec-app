import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from 'db';
import { FETCH_CATEGORIES } from './constants';

const categoriesRef = collection(db, 'categories');

export const fetchCategories = () => async (dispatch) => {
  const q = await query(categoriesRef, orderBy('order', 'asc'));

  const snapshot = await getDocs(q);

  const list = [];

  await snapshot.forEach((doc) => {
    const data = doc.data();

    list.push({
      id: doc.id,
      query: data.query,
      name: data.name,
      order: data.order,
    });
  });

  dispatch({ type: FETCH_CATEGORIES, payload: list });
};
