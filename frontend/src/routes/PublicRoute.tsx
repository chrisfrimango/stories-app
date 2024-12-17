import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Loading } from "../ui/Loading";

export function PublicRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading message="Loading authentication..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/blog" replace />;
  }

  return <Outlet />;
}
