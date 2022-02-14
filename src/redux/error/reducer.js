import { ERROR_MESSAGE } from './constants';
import initialState from '../store/initialState';

const { error } = initialState;

const errorReducer = (state = error, action) => {
  switch (action.type) {
    case ERROR_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;
