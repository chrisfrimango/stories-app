import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Suspense } from "react";
import { Loading } from "../ui/Loading";

const Blog = React.lazy(() => import("../pages/Blog"));
const Profile = React.lazy(() => import("../pages/Profile"));
const PostDetail = React.lazy(() => import("../pages/PostDetail"));

export function AuthenticatedRoutes() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user?.username) {
    return (
      <Routes>
        {/* Blog routes */}
        <Route
          path="/blog"
          element={<Navigate to={`/${user.username}/blog`} replace />}
        />
        <Route
          path={`/${user.username}/blog`}
          element={
            <Suspense fallback={<Loading message="Loading blog..." />}>
              <Blog />
            </Suspense>
          }
        />
        <Route
          path="/:username/blog"
          element={<Navigate to={`/${user.username}/blog`} replace />}
        />

        {/* Profile routes */}
        <Route
          path="/profile"
          element={<Navigate to={`/${user.username}/profile`} replace />}
        />
        <Route
          path={`/${user.username}/profile`}
          element={
            <Suspense fallback={<Loading message="Loading profile..." />}>
              <Profile />
            </Suspense>
          }
        />

        {/* Post detail routes */}
        <Route
          path="/:username/post/:id"
          element={
            <Suspense fallback={<Loading message="Loading post..." />}>
              <PostDetail />
            </Suspense>
          }
        />
        <Route
          path="/post/:id"
          element={<Navigate to={`/${user.username}/post/:id`} replace />}
        />
      </Routes>
    );
  }

  return <Navigate to="/login" replace />;
}
