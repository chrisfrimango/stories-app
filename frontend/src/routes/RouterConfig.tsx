import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { AuthenticatedRoutes } from "./AuthenticatedRoutes";
import { PublicRoutes } from "./PublicRoute";
import { Home, Login, Register } from "./lazyComponents";
import { Loading } from "../ui/Loading";
import { Suspense } from "react";

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
