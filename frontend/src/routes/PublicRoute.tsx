import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import React, { Suspense } from "react";
import { Loading } from "../ui/Loading";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));

export function PublicRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading message="Loading authentication..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading message="Loading home..." />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loading message="Loading login..." />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<Loading message="Loading register..." />}>
            <Register />
          </Suspense>
        }
      />
    </Routes>
  );
}
