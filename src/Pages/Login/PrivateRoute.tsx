import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface PrivateRouteProps {
  allowedRoles: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role: string) => allowedRoles?.includes(role)) ? <Outlet /> : auth ? <Navigate to="/unauthorized" state={{ from: location }} replace /> : <Navigate to="/login" state={{ from: location }} replace />;
};
