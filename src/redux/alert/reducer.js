import { ALERT_MESSAGE } from './constants';
import initialState from '../store/initialState';

const { alert } = initialState;

const alertReducer = (state = alert, action) => {
  switch (action.type) {
    case ALERT_MESSAGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default alertReducer;
