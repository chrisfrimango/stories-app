import React from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import {
  Container,
  Box,
  Paper,
  Typography,
  Divider,
  CardActions,
  Button,
} from "@mui/material";
import { useAuth } from "../../context/authContext";
import { Loading } from "../../ui/Loading";
import { Error } from "../../ui/Error";
import { useModal } from "../../context/modalContext";
import { useAlert } from "../../context/alertContext";
import { useDeleteProfile } from "../../hooks/useProfile";

const ProfileCard: React.FC = () => {
  const { user: currentUser, logout } = useAuth();

  const navigate = useNavigate();
  const { data: profile, isLoading, error } = useProfile(currentUser?.id || "");
  const { openEditProfileModal, openChangePasswordModal } = useModal();
  const { showAlert } = useAlert();
  const deleteProfile = useDeleteProfile(currentUser?.id || "");

  if (isLoading) return <Loading data-testid="loading" />;
  if (error) return <Error data-testid="error-message" />;

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteProfile.mutate(undefined, {
        onSuccess: () => {
          showAlert("Account deleted successfully", "success");
          logout();
        },
        onError: () => {
          showAlert("Failed to delete account", "error");
        },
      });
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      data-testid="profile-card"
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 4 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/blog")}
          data-testid="back-button"
        >
          Back to Blog
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5" data-testid="profile-section">
            Profile
          </Typography>
          <Divider />
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" data-testid="profile-username">
              username: {profile?.username}
            </Typography>
            <Typography variant="h6" data-testid="profile-email">
              email: {profile?.email}
            </Typography>
            <Typography variant="subtitle1" data-testid="profile-created-date">
              account created date: {profile?.created_at.slice(0, 10)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            onClick={() => openEditProfileModal(profile!)}
            data-testid="edit-profile-button"
          >
            Edit profile
          </Button>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5">Password</Typography>
          <Divider />
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              size="small"
              onClick={openChangePasswordModal}
              data-testid="change-password-button"
            >
              Change password
            </Button>
          </Box>
        </Paper>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="error"
          variant="contained"
          size="small"
          data-testid="delete-account-button"
          onClick={handleDeleteAccount}
        >
          Delete account
        </Button>
      </CardActions>
    </Container>
  );
};

export default ProfileCard;
