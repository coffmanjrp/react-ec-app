import {
  FETCH_PRODUCTS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from './productsConstants';
import initialState from '../store/initialState';

const { products } = initialState;

const productsReducer = (state = products, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
    case DELETE_PRODUCT:
    case UPDATE_PRODUCT: {
      return {
        ...state,
        list: [...action.payload],
      };
    }
    default:
      return state;
  }
};

export default productsReducer;
