import { FETCH_PRODUCTS, DELETE_PRODUCTS } from './productsConstants';
import initialState from '../store/initialState';

const { products } = initialState;

const productsReducer = (state = products, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
    case DELETE_PRODUCTS: {
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
