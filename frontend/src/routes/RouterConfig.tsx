import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Layout from "../components/layout/Layout";
import { AuthenticatedRoutes } from "./AuthenticatedRoutes";
import { PublicRoutes } from "./PublicRoute";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));

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
            element: <Home />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
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
