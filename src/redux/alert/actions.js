import { v4 as uuidv4 } from 'uuid';
import { ALERT_MESSAGE } from './constants';

export const setAlert = (type, message) => async (dispatch) => {
  const id = uuidv4().toString();

  dispatch({ type: ALERT_MESSAGE, payload: { id, type, message } });
};
