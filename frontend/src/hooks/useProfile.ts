import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "../services/profileApi";
import { useAuth } from "../context/auth";
import { useAlert } from "../context/alert";
import { ProfileInput, PasswordInput } from "../validation/schema";

export function useDeleteProfile(id: string) {
  const { showAlert } = useAlert();
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => profileApi.deleteProfile(id),
    onSuccess: () => {
      showAlert("Account deleted successfully", "success");
      queryClient.removeQueries({ queryKey: ["profile", id] });
      logout();
    },
    onError: () => {
      showAlert("Failed to delete account", "error");
    },
  });
}

export function useProfile(id: string) {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => profileApi.fetchProfile(id),
    retry: false,
    enabled: !!id,
  });

  return {
    profile,
    isLoading,
    error,
  };
}

export function useUpdateProfile(id: string) {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: (data: ProfileInput) => profileApi.updateProfile(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile", id] });
      showAlert("Profile updated successfully", "success");
      return response;
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      showAlert("Error updating profile", "error");
    },
  });
}

export function useChangePassword(id: string) {
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: (data: PasswordInput) => profileApi.changePassword(id, data),
    onSuccess: () => {
      showAlert("Password changed successfully", "success");
      return "Password changed successfully";
    },
    onError: (error) => {
      console.error("Error changing password:", error);
      showAlert("Error changing password", "error");
    },
  });
}
