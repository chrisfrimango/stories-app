import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { AuthenticatedRoutes } from "./AuthenticatedRoutes";
import { PublicRoutes } from "./PublicRoute";
import { Suspense } from "react";
import { Loading } from "../ui/Loading";
import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // Public routes
      {
        element: <PublicRoutes />,
        children: [
          {
            path: "/",
            element: (
              <Suspense fallback={<Loading message="Loading home..." />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "/login",
            element: (
              <Suspense fallback={<Loading message="Loading login..." />}>
                <Login />
              </Suspense>
            ),
          },
          {
            path: "/register",
            element: (
              <Suspense fallback={<Loading message="Loading register..." />}>
                <Register />
              </Suspense>
            ),
          },
        ],
      },
      // Protected and dynamic username routes
      {
        path: "/*",
        element: <AuthenticatedRoutes />,
      },
    ],
  },
]);
