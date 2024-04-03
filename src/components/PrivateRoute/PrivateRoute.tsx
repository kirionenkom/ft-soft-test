import { Navigate } from 'react-router-dom';
import { getSession } from '../../localStorage/sessionStorage'

type PrivateRouteProps = {
  children: React.ReactElement;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const user = getSession();
  return user ? children : <Navigate to={'/login'} />;
}