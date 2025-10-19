import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const role = localStorage.getItem('role');

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
