import { useAppSelector } from '../../store/hooks';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactElement;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const user = useAppSelector(state => state.messenger.currentUser);
  return user ? children : <Navigate to={'/login'} />;
}