import {
  FETCH_USER,
  FETCH_ORDERS_HISTORY,
  FETCH_PRODUCTS_IN_CART,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
} from './constants';
import initialState from '../store/initialState';

const { users } = initialState;

const usersReducer = (state = users, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        ...action.payload,
      };
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
    case SIGN_OUT: {
      return {
        ...state,
        cart: [],
        orders: [],
        role: '',
        uid: '',
        username: '',
        email: '',
      };
    }
    default:
      return state;
  }
};

export default usersReducer;
