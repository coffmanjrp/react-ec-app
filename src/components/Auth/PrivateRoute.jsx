import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from 'hooks';
import { Loading } from '../UIkit';

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Loading />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
