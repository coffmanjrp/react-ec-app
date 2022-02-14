import { ALERT_MESSAGE } from './constants';

export const setAlert = (type, message) => async (dispatch) =>
  dispatch({ type: ALERT_MESSAGE, payload: { type, message } });
