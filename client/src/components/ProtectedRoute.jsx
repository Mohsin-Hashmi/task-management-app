
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children, adminOnly }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/not-authorized" />;
  }
  return children;
};

export default ProtectedRoute;