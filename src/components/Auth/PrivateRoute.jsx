import { Navigate, Outlet } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useAuthStatus } from 'hooks';

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <CircularProgress />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
