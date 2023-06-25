import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/authSlice';

interface PrivateRouteProps {
  allowedRoles: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { email, roles, isLoading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  const rolesArray = Array.isArray(roles) ? roles : roles?.split(',');

  return rolesArray?.find((role: string) => allowedRoles.includes(role)) ? <Outlet /> : email ? <Navigate to="/unauthorized" state={{ from: location }} replace /> : <Navigate to="/login" state={{ from: location }} replace />;
};
