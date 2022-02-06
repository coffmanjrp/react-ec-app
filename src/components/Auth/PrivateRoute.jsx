import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { useAuthStatus } from 'hooks';
import { fetchProducts } from 'redux/products/actions';
import {
  fetchUser,
  fetchProductsInCart,
  fetchOrderHistory,
} from 'redux/users/actions';

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { loggedIn, checkingStatus } = useAuthStatus();

  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchUser());
      dispatch(fetchProducts());
      dispatch(fetchProductsInCart());
      dispatch(fetchOrderHistory());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  if (checkingStatus) {
    return <CircularProgress />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
