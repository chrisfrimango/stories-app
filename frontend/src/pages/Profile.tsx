import React from "react";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileSkeleton from "../ui/ProfileSkeleton";
import { Container } from "@mui/material";
import { useAuth } from "../context/auth";
import { Navigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { Error } from "../ui/Error";

const Profile: React.FC = () => {
  const { user: currentUser, isAuthenticated } = useAuth();
  const { data: profile, isLoading, error } = useProfile(currentUser?.id || "");

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (isLoading) return <ProfileSkeleton />;
  if (error) return <Error message="Failed to load profile" />;

  return (
    <Container sx={{ maxWidth: "600px" }}>
      <ProfileCard profile={profile!} />
    </Container>
  );
};

export default Profile;
