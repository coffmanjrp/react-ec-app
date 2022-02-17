import { FETCH_CATEGORIES } from './constants';
import initialState from '../store/initialState';

const { categories } = initialState;

const loadingReducer = (state = categories, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};

export default loadingReducer;
