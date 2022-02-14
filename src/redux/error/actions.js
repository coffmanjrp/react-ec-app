import { ERROR_MESSAGE } from './constants';

export const setErrorMessage = (text) => async (dispatch) =>
  dispatch({ type: ERROR_MESSAGE, payload: text });
