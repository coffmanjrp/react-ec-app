import { SET_LOADING } from './constants';
import initialState from '../store/initialState';

const { loading } = initialState;

const loadingReducer = (state = loading, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default loadingReducer;
