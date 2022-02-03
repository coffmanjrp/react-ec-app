import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../products/productsReducer';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
