import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../products/reducer';
import usersReducer from '../users/reducer';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
  },
});
