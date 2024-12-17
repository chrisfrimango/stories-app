import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "../../context/modalContext";
import { useUpdateProfile } from "../../hooks/useProfile";
import { useAlert } from "../../context/alertContext";
import { ProfileInput, profileSchema } from "../../validation/schema";
import { EditProfileModalProps } from "../../types/userTypes";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditProfile: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { editingProfile } = useModal();
  const { showAlert } = useAlert();
  const updateProfile = useUpdateProfile(editingProfile?.id?.toString() ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: editingProfile?.username || "",
      bio: editingProfile?.bio || "",
      email: editingProfile?.email || "",
    },
  });

  useEffect(() => {
    if (editingProfile) {
      console.log("Resetting form with:", editingProfile);
      reset({
        username: editingProfile.username || "",
        bio: editingProfile.bio || "",
        email: editingProfile.email || "",
      });
    }
  }, [editingProfile, reset]);

  const onSubmit = (data: ProfileInput) => {
    updateProfile.mutate(data, {
      onSuccess: () => {
        showAlert("Profile updated successfully", "success");
        onClose();
        reset();
      },
      onError: () => {
        showAlert("Failed to update profile", "error");
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          m: 2,
          borderRadius: 2,
          bgcolor: "background.paper",
        },
      }}
      data-testid="edit-profile-modal"
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div">
          Settings
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
          data-testid="edit-profile-cancel"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Profile Information
            </Typography>
            <TextField
              fullWidth
              label="Name"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
              sx={{ mb: 2 }}
              data-testid="edit-profile-name"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
              data-testid="edit-profile-email"
            />
            <TextField
              fullWidth
              label="Bio"
              multiline
              rows={4}
              {...register("bio")}
              error={!!errors.bio}
              helperText={errors.bio?.message}
              data-testid="edit-profile-bio"
            />
          </Box>

          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Preferences
            </Typography>
            {/* Add any additional preference settings here */}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          <Button
            onClick={onClose}
            variant="outlined"
            data-testid="edit-profile-cancel"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            data-testid="edit-profile-submit"
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditProfile;
