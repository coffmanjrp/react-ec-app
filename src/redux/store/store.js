import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../products/productsReducer';
import usersReducer from '../users/usersReducer';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
  },
});
