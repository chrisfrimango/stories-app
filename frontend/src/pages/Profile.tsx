import React from "react";
import ProfileCard from "../components/profile/ProfileCard";
import { Container } from "@mui/material";
import { useAuth } from "../context/auth";
import { Navigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <Container sx={{ maxWidth: "600px" }}>
      <ProfileCard />
    </Container>
  );
};

export default Profile;
