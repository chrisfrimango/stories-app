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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", id] });
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
