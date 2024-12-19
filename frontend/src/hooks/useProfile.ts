import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "../services/profileApi";
import type { PasswordInput, ProfileInput } from "../validation/schema";
import { useAlert } from "../context/alert";

export function useProfile(id: string) {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: () => profileApi.fetchProfile(id),
  });
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

export function useDeleteProfile(id: string) {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: () => profileApi.deleteProfile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile", id] });
      showAlert("Profile deleted successfully", "success");
      return "Profile deleted successfully";
    },
    onError: (error) => {
      console.error("Error deleting profile:", error);
      showAlert("Error deleting profile", "error");
      throw error;
    },
  });
}
