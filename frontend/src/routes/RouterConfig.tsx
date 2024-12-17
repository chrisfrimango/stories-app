import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { AuthenticatedRoutes } from "./AuthenticatedRoutes";
import { PublicRoutes } from "./PublicRoute";
import { Home, Login, Register } from "./lazyComponents";


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
