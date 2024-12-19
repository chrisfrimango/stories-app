import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/authService";
import { PasswordInput, ProfileInput } from "../validation/schema";
import { UserProfile } from "../types/userTypes";
export const profileApi = {
  fetchProfile: async (id: string) => {
    const { data } = await api.get<UserProfile>(`/profile/${id}`);
    return data;
  },
  updateProfile: async (id: string, data: ProfileInput) => {
    await api.put(`/profile/${id}`, data);
  },
  changePassword: async (id: string, data: PasswordInput) => {
    await api.put(`/profile/${id}/change-password`, data);
  },
  deleteProfile: async (id: string) => {
    await api.delete(`/profile/${id}`);
  },
};

export function useProfile(id: string) {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: () => profileApi.fetchProfile(id),
  });
}
export function useUpdateProfile(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProfileInput) => profileApi.updateProfile(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile", id] });
      queryClient.setQueryData(["profile", id], response);
      return "Profile updated successfully";
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });
}

export function useChangePassword(id: string) {
  return useMutation({
    mutationFn: (data: PasswordInput) => profileApi.changePassword(id, data),
    onSuccess: () => {
      return "Password changed successfully";
    },
    onError: (error) => {
      console.error("Error changing password:", error);
    },
  });
}

export function useDeleteProfile(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => profileApi.deleteProfile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile", id] });
      return "Profile deleted successfully";
    },
    onError: (error) => {
      console.error("Error deleting profile:", error);
      throw error;
    },
  });
}
