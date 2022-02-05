import {
  FETCH_ORDERS_HISTORY,
  FETCH_PRODUCTS_IN_CART,
  SIGN_IN,
  SIGN_UP,
} from './constants';
import initialState from '../store/initialState';

const { users } = initialState;

const usersReducer = (state = users, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_IN_CART:
      return {
        ...state,
        cart: [...action.payload],
      };
    case FETCH_ORDERS_HISTORY:
      return {
        ...state,
        orders: [...action.payload],
      };
    case SIGN_IN:
    case SIGN_UP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
