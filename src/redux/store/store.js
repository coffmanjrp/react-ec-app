import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../loading/reducer';
import productsReducer from '../products/reducer';
import usersReducer from '../users/reducer';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    loading: loadingReducer,
  },
});
