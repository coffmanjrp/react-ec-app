import {
  FETCH_ORDERS_HISTORY,
  FETCH_PRODUCTS_IN_CART,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
} from './usersConstants';
import initialState from '../store/initialState';

const { users } = initialState;

const usersReducer = (state = users, action) => {
  switch (action.type) {
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
