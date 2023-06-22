import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface PrivateRouteProps {
  allowedRoles: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { auth, isLoading } = useAuth();
  const location = useLocation();
  console.log(isLoading);
  // If data is still loading, just return null to prevent unauthorized navigation
  if (isLoading) {
    return null;
  }

  const rolesArray = Array.isArray(auth?.roles) ? auth.roles : auth?.roles?.split(',');

  return rolesArray?.find((role: string) => allowedRoles.includes(role)) ? <Outlet /> : auth ? <Navigate to="/unauthorized" state={{ from: location }} replace /> : <Navigate to="/login" state={{ from: location }} replace />;
};
