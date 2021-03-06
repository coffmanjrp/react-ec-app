import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import alertReducer from '../alert/reducer';
import categoriesReducer from '../categories/reducer';
import loadingReducer from '../loading/reducer';
import productsReducer from '../products/reducer';
import usersReducer from '../users/reducer';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    alert: alertReducer,
    categories: categoriesReducer,
    loading: loadingReducer,
    products: productsReducer,
    users: usersReducer,
  }),
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    routerMiddleware,
  ],
});

export const history = createReduxHistory(store);
