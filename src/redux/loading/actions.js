import { SET_LOADING } from './constants';

export const setLoading = (bool) => async (dispatch) =>
  dispatch({ type: SET_LOADING, payload: bool });
